import { inject, injectable } from "inversiland";
import { UseCase } from "src/core/application/UseCase";
import CreateObatPayload from "src/obat/application/types/CreateObatPayload";
import ObatEntity from "src/obat/domain/entities/ObatEntity";
import {
  IObatRepository,
  IObatRepositoryToken,
} from "src/obat/domain/specifications/IObatRepository";

@injectable()
export default class CreateObatUseCase
  implements UseCase<CreateObatPayload, Promise<ObatEntity>>
{
  constructor(
    @inject(IObatRepositoryToken)
    private readonly obatRepository: IObatRepository
  ) {}

  public execute(payload: CreateObatPayload) {
    return this.obatRepository.create(payload);
  }
}
