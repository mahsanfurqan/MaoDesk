import ListState from "src/core/presentation/types/ListState";
import ObatEntity from "src/obat/domain/entities/ObatEntity";

export interface GetObatFilters {
  search?: string;
  kategori?: string;
}

type GetObatStoreState = ListState<ObatEntity, GetObatFilters>;

export default GetObatStoreState;
