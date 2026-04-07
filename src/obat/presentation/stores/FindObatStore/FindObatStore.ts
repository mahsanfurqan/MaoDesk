import { inject, injectable } from "inversiland";
import { makeAutoObservable } from "mobx";
import FindObatStoreState from "src/obat/presentation/types/FindObatStoreState";
import FindObatUseCase from "src/obat/application/useCases/FindObatUseCase";

@injectable()
export class FindObatStore implements FindObatStoreState {
  isLoading = false;
  obat: FindObatStoreState["obat"] = null;

  constructor(
    @inject(FindObatUseCase)
    private readonly findObatUseCase: FindObatUseCase
  ) {
    makeAutoObservable(this);
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setObat(obat: FindObatStoreState["obat"]) {
    this.obat = obat;
  }

  async findObat(kode: string) {
    try {
      this.setIsLoading(true);
      this.setObat(await this.findObatUseCase.execute(kode));
    } finally {
      this.setIsLoading(false);
    }
  }
}
