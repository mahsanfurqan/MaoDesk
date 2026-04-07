import CreateObatPayload from "src/obat/application/types/CreateObatPayload";
import ObatEntity from "src/obat/domain/entities/ObatEntity";
import SubmitStoreState from "./SubmitStoreState";

export default interface PostObatStoreState extends SubmitStoreState {
  postObat: (payload: CreateObatPayload) => Promise<ObatEntity>;
}
