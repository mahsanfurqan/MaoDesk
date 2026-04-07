import { inject, injectable } from "inversiland";
import { UseCase } from "src/core/application/UseCase";
import ObatEntity from "src/obat/domain/entities/ObatEntity";
import {
  IObatRepository,
  IObatRepositoryToken,
} from "src/obat/domain/specifications/IObatRepository";
import UpdateObatPayload from "src/obat/application/types/UpdateObatPayload";

export interface UpdateObatUseCasePayload {
  kode: string;
  data: UpdateObatPayload;
}

@injectable()
export default class UpdateObatUseCase
  implements UseCase<UpdateObatUseCasePayload, Promise<ObatEntity>>
{
  constructor(
    @inject(IObatRepositoryToken)
    private readonly obatRepository: IObatRepository
  ) {}

  public execute(payload: UpdateObatUseCasePayload) {
    return this.obatRepository.update(payload.kode, payload.data);
  }
}
