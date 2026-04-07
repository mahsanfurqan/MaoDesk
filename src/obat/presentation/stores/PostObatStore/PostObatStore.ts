import { inject, injectable } from "inversiland";
import { makeAutoObservable } from "mobx";
import CreateObatPayload from "src/obat/application/types/CreateObatPayload";
import CreateObatUseCase from "src/obat/application/useCases/CreateObatUseCase";
import ObatEntity from "src/obat/domain/entities/ObatEntity";
import PostObatStoreState from "src/obat/presentation/types/PostObatStoreState";
import { parseObatErrorMessage } from "../utils/parseObatErrorMessage";

@injectable()
export class PostObatStore implements PostObatStoreState {
  isSubmitting = false;
  errorMessage: string | null = null;

  constructor(
    @inject(CreateObatUseCase)
    private readonly createObatUseCase: CreateObatUseCase
  ) {
    makeAutoObservable(this);
  }

  setIsSubmitting = (isSubmitting: boolean) => {
    this.isSubmitting = isSubmitting;
  };

  setErrorMessage = (errorMessage: string | null) => {
    this.errorMessage = errorMessage;
  };

  async postObat(payload: CreateObatPayload): Promise<ObatEntity> {
    this.setIsSubmitting(true);
    this.setErrorMessage(null);

    return this.createObatUseCase
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
