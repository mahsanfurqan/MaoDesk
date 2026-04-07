import { inject, injectable } from "inversiland";
import { makeAutoObservable } from "mobx";
import GetObatStoreState from "src/obat/presentation/types/GetObatStoreState";
import GetObatPayload from "src/obat/application/types/GetObatPayload";
import GetObatUseCase from "src/obat/application/useCases/GetObatUseCase";

interface GetObatRequestOptions {
  forceRefresh?: boolean;
  showLoading?: boolean;
}

interface CachedObatPage {
  results: GetObatStoreState["results"];
  count: number;
}

@injectable()
export class GetObatStore implements GetObatStoreState {
  isLoading = false;
  isRefreshing = false;
  errorMessage: string | null = null;
  results = [] as GetObatStoreState["results"];
  count = 0;
  filters: GetObatStoreState["filters"] = {};
  pagination = {
    page: 1,
    pageSize: 20,
  };
  private readonly pageCache = new Map<string, CachedObatPage>();

  constructor(
    @inject(GetObatUseCase)
    private readonly getObatUseCase: GetObatUseCase
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

  setResults = (results: GetObatStoreState["results"]) => {
    this.results = results;
  };

  setCount = (count: GetObatStoreState["count"]) => {
    this.count = count;
  };

  mergeFilters = (payload: Partial<GetObatStoreState["filters"]>) => {
    Object.assign(this.filters, payload);
  };

  mergePagination = (payload: Partial<GetObatStoreState["pagination"]>) => {
    Object.assign(this.pagination, payload);
  };

  clearCache = () => {
    this.pageCache.clear();
  };

  private getPayload(): GetObatPayload {
    return {
      ...this.filters,
      ...this.pagination,
    };
  }

  private getCacheKey(payload: GetObatPayload) {
    return JSON.stringify({
      page: payload.page,
      pageSize: payload.pageSize,
      search: payload.search ?? "",
      kategori: payload.kategori ?? "",
    });
  }

  private setResponse(response: CachedObatPage) {
    this.setResults(response.results);
    this.setCount(response.count);
  }

  private parseErrorMessage(error: unknown) {
    const responseMessage = (
      error as {
        response?: {
          data?: {
            message?: string;
            error_description?: string;
          };
        };
      }
    )?.response?.data;

    if (responseMessage?.message) {
      return responseMessage.message;
    }

    if (responseMessage?.error_description) {
      return responseMessage.error_description;
    }

    if (error instanceof Error && error.message) {
      return error.message;
    }

    return "Unknown error";
  }

  async getObat(options: GetObatRequestOptions = {}) {
    const payload = this.getPayload();
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

    return this.getObatUseCase
      .execute(payload)
      .then((response) => {
        this.pageCache.set(cacheKey, {
          results: response.results,
          count: response.count,
        });
        this.setResponse(response);
      })
      .catch((error) => {
        this.setErrorMessage(this.parseErrorMessage(error));

        throw error;
      })
      .finally(() => {
        if (showLoading) {
          this.setIsLoading(false);
        }
      });
  }

  async refreshObat() {
    this.setIsRefreshing(true);
    this.clearCache();

    return this.getObat({
      forceRefresh: true,
      showLoading: false,
    }).finally(() => {
      this.setIsRefreshing(false);
    });
  }
}
