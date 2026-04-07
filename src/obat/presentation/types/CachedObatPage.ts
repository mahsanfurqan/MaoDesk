import GetObatStoreState from "./GetObatStoreState";

export default interface CachedObatPage {
  results: GetObatStoreState["results"];
  count: number;
}
