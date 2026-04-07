import { inject, injectable } from "inversiland";
import { UseCase } from "src/core/application/UseCase";
import GetStockMutationsPayload from "src/obat/application/types/GetStockMutationsPayload";
import GetStockMutationsResponse from "src/obat/application/types/GetStockMutationsResponse";
import {
  IObatRepository,
  IObatRepositoryToken,
} from "src/obat/domain/specifications/IObatRepository";

@injectable()
export default class GetStockMutationsUseCase
  implements
    UseCase<GetStockMutationsPayload, Promise<GetStockMutationsResponse>>
{
  constructor(
    @inject(IObatRepositoryToken)
    private readonly obatRepository: IObatRepository
  ) {}

  public execute(payload: GetStockMutationsPayload) {
    return this.obatRepository.getStockMutations(payload);
  }
}
