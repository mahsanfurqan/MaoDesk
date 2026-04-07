import { injectable, inject } from "inversiland";
import { plainToInstance } from "class-transformer";
import IHttpClient, {
  IHttpClientToken,
} from "src/core/domain/specifications/IHttpClient";
import Env, { EnvToken } from "src/core/domain/entities/Env";
import GetObatPayload from "src/obat/application/types/GetObatPayload";
import GetObatResponse from "src/obat/application/types/GetObatResponse";
import {
  IObatRepository,
} from "src/obat/domain/specifications/IObatRepository";
import ObatDto from "src/obat/infrastructure/models/ObatDto";
import GetObatQuery from "src/obat/infrastructure/models/GetObatQuery";

@injectable()
class ObatRepository implements IObatRepository {
  private readonly restPath = "/rest/v1";

  constructor(
    @inject(IHttpClientToken) private readonly httpClient: IHttpClient,
    @inject(EnvToken) private readonly env: Env
  ) {}

  private get endpoint() {
    return `${this.restPath}/${this.env.supabaseObatTable}`;
  }

  private get supabaseHeaders() {
    return {
      apikey: this.env.supabaseAnonKey,
      Authorization: `Bearer ${this.env.supabaseAnonKey}`,
    };
  }

  private parseContentRange(contentRange?: string) {
    if (!contentRange) {
      return 0;
    }

    const [, total = "0"] = contentRange.split("/");
    const count = Number(total);

    return Number.isNaN(count) ? 0 : count;
  }

  private buildFilterParams(query: GetObatQuery) {
    const params: Record<string, string> = {
      select: "*",
    };

    if (query.search) {
      params.nama = `ilike.*${query.search}*`;
    }

    if (query.kategori) {
      params.kategori = `eq.${query.kategori}`;
    }

    return params;
  }

  public async find(kode: string) {
    const response = await this.httpClient.get<unknown[]>(this.endpoint, {
      headers: this.supabaseHeaders,
      params: {
        select: "*",
        kode: `eq.${kode}`,
        limit: 1,
      },
    });

    const [obat] = response;

    if (!obat) {
      return null;
    }

    return plainToInstance(ObatDto, obat).toDomain();
  }

  public async get(payload: GetObatPayload): Promise<GetObatResponse> {
    const query = new GetObatQuery(payload);
    const offset = (query.page - 1) * query.pageSize;
    const filterParams = this.buildFilterParams(query);

    const [results, responseHeaders] = await Promise.all([
      this.httpClient.get<unknown[]>(this.endpoint, {
        headers: this.supabaseHeaders,
        params: {
          ...filterParams,
          order: "nama.asc",
          limit: query.pageSize,
          offset,
        },
      }),
      this.httpClient.head(this.endpoint, {
        headers: {
          ...this.supabaseHeaders,
          Prefer: "count=exact",
        },
        params: filterParams,
      }),
    ]);

    const contentRange =
      responseHeaders["content-range"] ?? responseHeaders["Content-Range"];

    return {
      results: results.map((obat) => plainToInstance(ObatDto, obat).toDomain()),
      count: this.parseContentRange(contentRange),
    };
  }
}

export default ObatRepository;