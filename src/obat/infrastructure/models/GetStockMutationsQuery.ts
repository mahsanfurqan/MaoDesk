import { Expose } from "class-transformer";
import PayloadDto from "src/core/infrastructure/models/PayloadDto";
import GetStockMutationsPayload from "src/obat/application/types/GetStockMutationsPayload";

export default class GetStockMutationsQuery extends PayloadDto<GetStockMutationsPayload> {
  @Expose()
  kode!: string;

  @Expose()
  page!: number;

  @Expose()
  pageSize!: number;

  constructor(payload: GetStockMutationsPayload) {
    super(payload);
    Object.assign(this, this.transform(payload));
  }

  transform(payload: GetStockMutationsPayload) {
    return {
      kode: payload.kode.trim(),
      page: Math.max(1, payload.page),
      pageSize: Math.max(1, payload.pageSize),
    };
  }
}
