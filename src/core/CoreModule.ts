import { getModuleContainer, module } from "inversiland";
import I18n from "./presentation/i18n";
import HttpClient from "./infrastructure/implementations/HttpClient";
import { IHttpClientToken } from "./domain/specifications/IHttpClient";
import Env, { EnvToken } from "./domain/entities/Env";

@module({
  providers: [
    I18n,
    {
      isGlobal: true,
      provide: EnvToken,
      useValue: {
        apiUrl: process.env.EXPO_PUBLIC_API_URL ?? "",
        supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "",
        supabaseObatTable: process.env.EXPO_PUBLIC_SUPABASE_OBAT_TABLE ?? "obat",
      } as Env,
    },
    {
      isGlobal: true,
      provide: IHttpClientToken,
      useClass: HttpClient,
    },
  ],
})
export class CoreModule {}

export const coreModuleContainer = getModuleContainer(CoreModule);
