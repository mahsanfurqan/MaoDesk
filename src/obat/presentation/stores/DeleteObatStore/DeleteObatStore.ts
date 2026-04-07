import { inject, injectable } from "inversiland";
import { makeAutoObservable } from "mobx";
import DeleteObatUseCase from "src/obat/application/useCases/DeleteObatUseCase";
import DeleteObatStoreState from "src/obat/presentation/types/DeleteObatStoreState";
import { parseObatErrorMessage } from "../utils/parseObatErrorMessage";

@injectable()
export class DeleteObatStore implements DeleteObatStoreState {
  isSubmitting = false;
  errorMessage: string | null = null;

  constructor(
    @inject(DeleteObatUseCase)
    private readonly deleteObatUseCase: DeleteObatUseCase
  ) {
    makeAutoObservable(this);
  }

  setIsSubmitting = (isSubmitting: boolean) => {
    this.isSubmitting = isSubmitting;
  };

  setErrorMessage = (errorMessage: string | null) => {
    this.errorMessage = errorMessage;
  };

  async deleteObat(kode: string): Promise<void> {
    this.setIsSubmitting(true);
    this.setErrorMessage(null);

    return this.deleteObatUseCase
      .execute(kode)
      .catch((error) => {
        this.setErrorMessage(parseObatErrorMessage(error));

        throw error;
      })
      .finally(() => {
        this.setIsSubmitting(false);
      });
  }
}
