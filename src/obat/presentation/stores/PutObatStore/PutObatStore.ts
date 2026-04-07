import { inject, injectable } from "inversiland";
import { makeAutoObservable } from "mobx";
import UpdateObatPayload from "src/obat/application/types/UpdateObatPayload";
import UpdateObatUseCase from "src/obat/application/useCases/UpdateObatUseCase";
import ObatEntity from "src/obat/domain/entities/ObatEntity";
import PutObatStoreState from "src/obat/presentation/types/PutObatStoreState";
import { parseObatErrorMessage } from "../utils/parseObatErrorMessage";

@injectable()
export class PutObatStore implements PutObatStoreState {
  isSubmitting = false;
  errorMessage: string | null = null;

  constructor(
    @inject(UpdateObatUseCase)
    private readonly updateObatUseCase: UpdateObatUseCase
  ) {
    makeAutoObservable(this);
  }

  setIsSubmitting = (isSubmitting: boolean) => {
    this.isSubmitting = isSubmitting;
  };

  setErrorMessage = (errorMessage: string | null) => {
    this.errorMessage = errorMessage;
  };

  async putObat(kode: string, payload: UpdateObatPayload): Promise<ObatEntity> {
    this.setIsSubmitting(true);
    this.setErrorMessage(null);

    return this.updateObatUseCase
      .execute({ kode, data: payload })
      .catch((error) => {
        this.setErrorMessage(parseObatErrorMessage(error));

        throw error;
      })
      .finally(() => {
        this.setIsSubmitting(false);
      });
  }
}
