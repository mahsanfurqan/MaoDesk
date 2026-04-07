import { inject, injectable } from "inversiland";
import { makeAutoObservable } from "mobx";
import GetStockMutationsPayload from "src/obat/application/types/GetStockMutationsPayload";
import GetStockMutationsUseCase from "src/obat/application/useCases/GetStockMutationsUseCase";
import GetStockMutationsStoreState from "src/obat/presentation/types/GetStockMutationsStoreState";
import { parseObatErrorMessage } from "src/obat/presentation/stores/utils/parseObatErrorMessage";
import GetStockMutationsRequestOptions from "src/obat/presentation/types/GetStockMutationsRequestOptions";
import CachedStockMutationPage from "src/obat/presentation/types/CachedStockMutationPage";

@injectable()
export class GetStockMutationsStore implements GetStockMutationsStoreState {
  isLoading = false;
  isRefreshing = false;
  errorMessage: string | null = null;
  results = [] as GetStockMutationsStoreState["results"];
  count = 0;
  filters: GetStockMutationsStoreState["filters"] = {};
  pagination = {
    page: 1,
    pageSize: 10,
  };
  private readonly pageCache = new Map<string, CachedStockMutationPage>();

  constructor(
    @inject(GetStockMutationsUseCase)
    private readonly getStockMutationsUseCase: GetStockMutationsUseCase
  ) {
    makeAutoObservable(this);
  }

  get pageCount() {
    return Math.ceil(this.count / this.pagination.pageSize);
  }

  get isEmpty(): boolean {
    return this.results.length === 0;
  }

  setIsLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  };

  setIsRefreshing = (isRefreshing: boolean) => {
    this.isRefreshing = isRefreshing;
  };

  setErrorMessage = (errorMessage: string | null) => {
    this.errorMessage = errorMessage;
  };

  setResults = (results: GetStockMutationsStoreState["results"]) => {
    this.results = results;
  };

  setCount = (count: GetStockMutationsStoreState["count"]) => {
    this.count = count;
  };

  mergePagination = (
    payload: Partial<GetStockMutationsStoreState["pagination"]>
  ) => {
    Object.assign(this.pagination, payload);
  };

  clearCache = () => {
    this.pageCache.clear();
  };

  private getPayload(kode: string): GetStockMutationsPayload {
    return {
      kode,
      ...this.pagination,
    };
  }

  private getCacheKey(payload: GetStockMutationsPayload) {
    return JSON.stringify({
      kode: payload.kode,
      page: payload.page,
      pageSize: payload.pageSize,
    });
  }

  private setResponse(response: CachedStockMutationPage) {
    this.setResults(response.results);
    this.setCount(response.count);
  }

  async getStockMutations(
    kode: string,
    options: GetStockMutationsRequestOptions = {}
  ) {
    const normalizedKode = kode.trim();

    if (!normalizedKode) {
      this.setResults([]);
      this.setCount(0);

      return;
    }

    const payload = this.getPayload(normalizedKode);
    const cacheKey = this.getCacheKey(payload);
    const cachedPage = this.pageCache.get(cacheKey);
    const { forceRefresh = false, showLoading = true } = options;

    if (cachedPage && !forceRefresh) {
      this.setResponse(cachedPage);
      this.setErrorMessage(null);

      return;
    }

    if (showLoading) {
      this.setIsLoading(true);
    }

    this.setErrorMessage(null);

    return this.getStockMutationsUseCase
      .execute(payload)
      .then((response) => {
        this.pageCache.set(cacheKey, {
          results: response.results,
          count: response.count,
        });
        this.setResponse(response);
      })
      .catch((error) => {
        this.setErrorMessage(parseObatErrorMessage(error));

        throw error;
      })
      .finally(() => {
        if (showLoading) {
          this.setIsLoading(false);
        }
      });
  }

  async refreshStockMutations(kode: string) {
    this.setIsRefreshing(true);
    this.clearCache();

    return this.getStockMutations(kode, {
      forceRefresh: true,
      showLoading: false,
    }).finally(() => {
      this.setIsRefreshing(false);
    });
  }
}
