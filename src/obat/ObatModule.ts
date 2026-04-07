import { getModuleContainer, module } from "inversiland";
import { IObatRepositoryToken } from "./domain/specifications/IObatRepository";
import ObatRepository from "./infrastructure/implementations/ObatRepository";
import GetObatUseCase from "./application/useCases/GetObatUseCase";
import FindObatUseCase from "./application/useCases/FindObatUseCase";
import CreateObatUseCase from "./application/useCases/CreateObatUseCase";
import UpdateObatUseCase from "./application/useCases/UpdateObatUseCase";
import DeleteObatUseCase from "./application/useCases/DeleteObatUseCase";
import AdjustStockUseCase from "./application/useCases/AdjustStockUseCase";
import GetStockMutationsUseCase from "./application/useCases/GetStockMutationsUseCase";
import { GetObatStore } from "./presentation/stores/GetObatStore/GetObatStore";
import { FindObatStore } from "./presentation/stores/FindObatStore/FindObatStore";
import { GetStockMutationsStore } from "./presentation/stores/GetStockMutationsStore/GetStockMutationsStore";
import { PostObatStore } from "./presentation/stores/PostObatStore/PostObatStore";
import { PutObatStore } from "./presentation/stores/PutObatStore/PutObatStore";
import { DeleteObatStore } from "./presentation/stores/DeleteObatStore/DeleteObatStore";
import { AdjustStockStore } from "./presentation/stores/AdjustStockStore/AdjustStockStore";

@module({
  providers: [
    {
      provide: IObatRepositoryToken,
      useClass: ObatRepository,
    },
    GetObatUseCase,
    FindObatUseCase,
    CreateObatUseCase,
    UpdateObatUseCase,
    DeleteObatUseCase,
    AdjustStockUseCase,
    GetStockMutationsUseCase,
    {
      useClass: GetObatStore,
      scope: "Transient",
    },
    {
      useClass: FindObatStore,
      scope: "Transient",
    },
    {
      useClass: PostObatStore,
      scope: "Transient",
    },
    {
      useClass: PutObatStore,
      scope: "Transient",
    },
    {
      useClass: DeleteObatStore,
      scope: "Transient",
    },
    {
      useClass: AdjustStockStore,
      scope: "Transient",
    },
    {
      useClass: GetStockMutationsStore,
      scope: "Transient",
    },
  ],
})
export class ObatModule {}

export const obatModuleContainer = getModuleContainer(ObatModule);