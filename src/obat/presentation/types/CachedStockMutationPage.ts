import GetStockMutationsStoreState from "./GetStockMutationsStoreState";

export default interface CachedStockMutationPage {
  results: GetStockMutationsStoreState["results"];
  count: number;
}
