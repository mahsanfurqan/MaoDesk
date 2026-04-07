import { injectable, inject } from "inversiland";
import { plainToInstance } from "class-transformer";
import IHttpClient, {
  IHttpClientToken,
} from "src/core/domain/specifications/IHttpClient";
import Env, { EnvToken } from "src/core/domain/entities/Env";
import GetObatPayload from "src/obat/application/types/GetObatPayload";
import GetObatResponse from "src/obat/application/types/GetObatResponse";
import CreateObatPayload from "src/obat/application/types/CreateObatPayload";
import UpdateObatPayload from "src/obat/application/types/UpdateObatPayload";
import AdjustStockPayload from "src/obat/application/types/AdjustStockPayload";
import GetStockMutationsPayload from "src/obat/application/types/GetStockMutationsPayload";
import GetStockMutationsResponse from "src/obat/application/types/GetStockMutationsResponse";
import {
  IObatRepository,
} from "src/obat/domain/specifications/IObatRepository";
import ObatDto from "src/obat/infrastructure/models/ObatDto";
import GetObatQuery from "src/obat/infrastructure/models/GetObatQuery";
import ObatEntity from "src/obat/domain/entities/ObatEntity";
import StockMutationEntity from "src/obat/domain/entities/StockMutationEntity";
import StockMutationDto from "src/obat/infrastructure/models/StockMutationDto";
import GetStockMutationsQuery from "src/obat/infrastructure/models/GetStockMutationsQuery";

@injectable()
class ObatRepository implements IObatRepository {
  private readonly restPath = "/rest/v1";
  private readonly stockMutationTable = "mutasi_stok";

  constructor(
    @inject(IHttpClientToken) private readonly httpClient: IHttpClient,
    @inject(EnvToken) private readonly env: Env
  ) {}

  private get endpoint() {
    return `${this.restPath}/${this.env.supabaseObatTable}`;
  }

  private get stockMutationEndpoint() {
    return `${this.restPath}/${this.stockMutationTable}`;
  }

  private get adjustStockRpcEndpoint() {
    return `${this.restPath}/rpc/adjust_obat_stock`;
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

  private mapToDomain(obat: unknown): ObatEntity {
    return plainToInstance(ObatDto, obat).toDomain();
  }

  private mapToStockMutation(mutation: unknown): StockMutationEntity {
    return plainToInstance(StockMutationDto, mutation).toDomain();
  }

  private toSupabasePayload(payload: Partial<CreateObatPayload>) {
    const mappedPayload: Record<string, unknown> = {
      kode: payload.kode,
      nama: payload.nama,
      kategori: payload.kategori,
      stok: payload.stok,
      satuan_beli: payload.satuanBeli,
      harga_beli: payload.hargaBeli,
      stok_min: payload.stokMin,
      satuan_1: payload.satuan1,
      satuan_2: payload.satuan2,
      satuan_3: payload.satuan3,
      satuan_4: payload.satuan4,
      isi_1: payload.isi1,
      isi_2: payload.isi2,
      isi_3: payload.isi3,
      isi_4: payload.isi4,
      harga_jual_1: payload.hargaJual1,
      harga_jual_2: payload.hargaJual2,
      harga_jual_3: payload.hargaJual3,
      harga_jual_4: payload.hargaJual4,
      harga_resep_1: payload.hargaResep1,
      harga_resep_2: payload.hargaResep2,
      harga_resep_3: payload.hargaResep3,
      harga_resep_4: payload.hargaResep4,
      laba_otomatis: payload.labaOtomatis,
      suplier: payload.suplier,
      pabrik: payload.pabrik,
      expired: payload.expired,
      indikasi: payload.indikasi,
      komposisi: payload.komposisi,
      lokasi: payload.lokasi,
      no_batch: payload.noBatch,
    };

    return Object.fromEntries(
      Object.entries(mappedPayload).filter(([, value]) => value !== undefined)
    );
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

    return this.mapToDomain(obat);
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
      results: results.map((obat) => this.mapToDomain(obat)),
      count: this.parseContentRange(contentRange),
    };
  }

  public async create(data: CreateObatPayload): Promise<ObatEntity> {
    const payload = this.toSupabasePayload(data);
    const response = await this.httpClient.post<Record<string, unknown>, unknown[]>(
      this.endpoint,
      payload,
      {
        headers: {
          ...this.supabaseHeaders,
          Prefer: "return=representation",
        },
        params: {
          select: "*",
        },
      }
    );

    const [createdObat] = response;

    if (!createdObat) {
      throw new Error("Gagal membuat data obat.");
    }

    return this.mapToDomain(createdObat);
  }

  public async update(
    kode: string,
    data: UpdateObatPayload
  ): Promise<ObatEntity> {
    const payload = this.toSupabasePayload(data);

    if (Object.keys(payload).length === 0) {
      throw new Error("Tidak ada data yang diubah.");
    }

    const response = await this.httpClient.patch<Record<string, unknown>, unknown[]>(
      this.endpoint,
      payload,
      {
        headers: {
          ...this.supabaseHeaders,
          Prefer: "return=representation",
        },
        params: {
          select: "*",
          kode: `eq.${kode}`,
        },
      }
    );

    const [updatedObat] = response;

    if (!updatedObat) {
      throw new Error("Data obat tidak ditemukan.");
    }

    return this.mapToDomain(updatedObat);
  }

  public async remove(kode: string): Promise<void> {
    await this.httpClient.delete<unknown>(this.endpoint, {
      headers: this.supabaseHeaders,
      params: {
        kode: `eq.${kode}`,
      },
    });
  }

  public async adjustStock(data: AdjustStockPayload): Promise<StockMutationEntity> {
    const jumlah = Number(data.jumlah);

    if (Number.isNaN(jumlah)) {
      throw new Error("Jumlah mutasi harus berupa angka.");
    }

    const response = await this.httpClient.post<Record<string, unknown>, unknown[]>(
      this.adjustStockRpcEndpoint,
      {
        p_kode: data.kode,
        p_tipe: data.tipe,
        p_jumlah: jumlah,
        p_catatan: data.catatan ?? null,
      },
      {
        headers: this.supabaseHeaders,
      }
    );

    const [mutation] = response;

    if (!mutation) {
      throw new Error("Gagal menyimpan mutasi stok.");
    }

    return this.mapToStockMutation(mutation);
  }

  public async getStockMutations(
    payload: GetStockMutationsPayload
  ): Promise<GetStockMutationsResponse> {
    const query = new GetStockMutationsQuery(payload);

    if (!query.kode) {
      throw new Error("Kode obat wajib diisi.");
    }

    const offset = (query.page - 1) * query.pageSize;
    const filterParams = {
      select: "*",
      obat_kode: `eq.${query.kode}`,
    };

    const [results, responseHeaders] = await Promise.all([
      this.httpClient.get<unknown[]>(this.stockMutationEndpoint, {
        headers: this.supabaseHeaders,
        params: {
          ...filterParams,
          order: "created_at.desc,id.desc",
          limit: query.pageSize,
          offset,
        },
      }),
      this.httpClient.head(this.stockMutationEndpoint, {
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
      results: results.map((mutation) => this.mapToStockMutation(mutation)),
      count: this.parseContentRange(contentRange),
    };
  }
}

export default ObatRepository;