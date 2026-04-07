import { getModuleContainer, module } from "inversiland";
import { IObatRepositoryToken } from "./domain/specifications/IObatRepository";
import ObatRepository from "./infrastructure/implementations/ObatRepository";
import GetObatUseCase from "./application/useCases/GetObatUseCase";
import FindObatUseCase from "./application/useCases/FindObatUseCase";
import { GetObatStore } from "./presentation/stores/GetObatStore/GetObatStore";
import { FindObatStore } from "./presentation/stores/FindObatStore/FindObatStore";

@module({
  providers: [
    {
      provide: IObatRepositoryToken,
      useClass: ObatRepository,
    },
    GetObatUseCase,
    FindObatUseCase,
    {
      useClass: GetObatStore,
      scope: "Transient",
    },
    {
      useClass: FindObatStore,
      scope: "Transient",
    },
  ],
})
export class ObatModule {}

export const obatModuleContainer = getModuleContainer(ObatModule);