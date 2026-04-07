import { inject, injectable } from "inversiland";
import { UseCase } from "src/core/application/UseCase";
import {
  IObatRepository,
  IObatRepositoryToken,
} from "src/obat/domain/specifications/IObatRepository";

@injectable()
export default class DeleteObatUseCase
  implements UseCase<string, Promise<void>>
{
  constructor(
    @inject(IObatRepositoryToken)
    private readonly obatRepository: IObatRepository
  ) {}

  public execute(kode: string) {
    return this.obatRepository.remove(kode);
  }
}
