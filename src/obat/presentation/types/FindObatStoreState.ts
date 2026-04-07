import ObatEntity from "src/obat/domain/entities/ObatEntity";

export default interface FindObatStoreState {
  isLoading: boolean;
  obat: ObatEntity | null;
}
