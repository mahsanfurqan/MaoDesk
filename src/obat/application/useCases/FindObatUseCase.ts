import { inject, injectable } from "inversiland";
import {
  IObatRepository,
  IObatRepositoryToken,
} from "src/obat/domain/specifications/IObatRepository";

@injectable()
export default class FindObatUseCase {
  constructor(
    @inject(IObatRepositoryToken)
    private readonly obatRepository: IObatRepository
  ) {}

  public execute(kode: string) {
    return this.obatRepository.find(kode);
  }
}
