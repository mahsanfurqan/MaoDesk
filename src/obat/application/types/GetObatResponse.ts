import ObatEntity from "src/obat/domain/entities/ObatEntity";

export default interface GetObatResponse {
  results: ObatEntity[];
  count: number;
}