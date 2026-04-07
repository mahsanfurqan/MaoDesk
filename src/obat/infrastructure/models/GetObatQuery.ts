import PayloadDto from "src/core/infrastructure/models/PayloadDto";
import GetObatPayload from "src/obat/application/types/GetObatPayload";
import { Expose } from "class-transformer";

export default class GetObatQuery extends PayloadDto<GetObatPayload> {
  @Expose()
  page!: number;

  @Expose()
  pageSize!: number;

  @Expose()
  search?: string;

  @Expose()
  kategori?: string;

  transform(payload: GetObatPayload) {
    return {
      page: Math.max(1, payload.page),
      pageSize: Math.max(1, payload.pageSize),
      search: payload.search?.trim() || undefined,
      kategori: payload.kategori?.trim() || undefined,
    };
  }
}