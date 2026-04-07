import { inject, injectable } from "inversiland";
import { UseCase } from "src/core/application/UseCase";
import AdjustStockPayload from "src/obat/application/types/AdjustStockPayload";
import StockMutationEntity from "src/obat/domain/entities/StockMutationEntity";
import {
  IObatRepository,
  IObatRepositoryToken,
} from "src/obat/domain/specifications/IObatRepository";

@injectable()
export default class AdjustStockUseCase
  implements UseCase<AdjustStockPayload, Promise<StockMutationEntity>>
{
  constructor(
    @inject(IObatRepositoryToken)
    private readonly obatRepository: IObatRepository
  ) {}

  public execute(payload: AdjustStockPayload) {
    return this.obatRepository.adjustStock(payload);
  }
}
