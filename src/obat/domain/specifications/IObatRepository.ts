import ObatEntity from "../entities/ObatEntity";
import GetObatPayload from "../../application/types/GetObatPayload";
import GetObatResponse from "src/obat/application/types/GetObatResponse";

export const IObatRepositoryToken = Symbol("IObatRepository");

export interface IObatRepository {
  find: (kode: string) => Promise<ObatEntity | null>;
  get: (data: GetObatPayload) => Promise<GetObatResponse>;
}