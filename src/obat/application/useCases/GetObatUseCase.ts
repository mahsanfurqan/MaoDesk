import { injectable, inject } from "inversiland";
import { UseCase } from "src/core/application/UseCase";
import GetObatPayload from "src/obat/application/types/GetObatPayload";
import GetObatResponse from "src/obat/application/types/GetObatResponse";
import {
  IObatRepository,
  IObatRepositoryToken,
} from "src/obat/domain/specifications/IObatRepository";

@injectable()
export default class GetObatUseCase
  implements UseCase<GetObatPayload, Promise<GetObatResponse>>
{
  constructor(
    @inject(IObatRepositoryToken)
    private readonly obatRepository: IObatRepository
  ) {}

  public execute(payload: GetObatPayload) {
    return this.obatRepository.get(payload);
  }
}