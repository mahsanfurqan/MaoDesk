import UpdateObatPayload from "src/obat/application/types/UpdateObatPayload";
import ObatEntity from "src/obat/domain/entities/ObatEntity";
import SubmitStoreState from "./SubmitStoreState";

export default interface PutObatStoreState extends SubmitStoreState {
  putObat: (kode: string, payload: UpdateObatPayload) => Promise<ObatEntity>;
}
