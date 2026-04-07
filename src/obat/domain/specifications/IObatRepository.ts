import ObatEntity from "../entities/ObatEntity";
import GetObatPayload from "../../application/types/GetObatPayload";
import GetObatResponse from "src/obat/application/types/GetObatResponse";
import CreateObatPayload from "src/obat/application/types/CreateObatPayload";
import UpdateObatPayload from "src/obat/application/types/UpdateObatPayload";
import AdjustStockPayload from "src/obat/application/types/AdjustStockPayload";
import StockMutationEntity from "src/obat/domain/entities/StockMutationEntity";
import GetStockMutationsPayload from "src/obat/application/types/GetStockMutationsPayload";
import GetStockMutationsResponse from "src/obat/application/types/GetStockMutationsResponse";

export const IObatRepositoryToken = Symbol("IObatRepository");

export interface IObatRepository {
  find: (kode: string) => Promise<ObatEntity | null>;
  get: (data: GetObatPayload) => Promise<GetObatResponse>;
  create: (data: CreateObatPayload) => Promise<ObatEntity>;
  update: (kode: string, data: UpdateObatPayload) => Promise<ObatEntity>;
  remove: (kode: string) => Promise<void>;
  adjustStock: (data: AdjustStockPayload) => Promise<StockMutationEntity>;
  getStockMutations: (
    data: GetStockMutationsPayload
  ) => Promise<GetStockMutationsResponse>;
}