import { inject, injectable } from "inversiland";
import { makeAutoObservable } from "mobx";
import AdjustStockPayload from "src/obat/application/types/AdjustStockPayload";
import AdjustStockUseCase from "src/obat/application/useCases/AdjustStockUseCase";
import StockMutationEntity from "src/obat/domain/entities/StockMutationEntity";
import AdjustStockStoreState from "src/obat/presentation/types/AdjustStockStoreState";
import { parseObatErrorMessage } from "../utils/parseObatErrorMessage";

@injectable()
export class AdjustStockStore implements AdjustStockStoreState {
  isSubmitting = false;
  errorMessage: string | null = null;

  constructor(
    @inject(AdjustStockUseCase)
    private readonly adjustStockUseCase: AdjustStockUseCase
  ) {
    makeAutoObservable(this);
  }

  setIsSubmitting = (isSubmitting: boolean) => {
    this.isSubmitting = isSubmitting;
  };

  setErrorMessage = (errorMessage: string | null) => {
    this.errorMessage = errorMessage;
  };

  async adjustStock(payload: AdjustStockPayload): Promise<StockMutationEntity> {
    this.setIsSubmitting(true);
    this.setErrorMessage(null);

    return this.adjustStockUseCase
      .execute(payload)
      .catch((error) => {
        this.setErrorMessage(parseObatErrorMessage(error));

        throw error;
      })
      .finally(() => {
        this.setIsSubmitting(false);
      });
  }
}
