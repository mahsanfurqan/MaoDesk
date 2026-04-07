import SubmitStoreState from "./SubmitStoreState";

export default interface DeleteObatStoreState extends SubmitStoreState {
  deleteObat: (kode: string) => Promise<void>;
}
