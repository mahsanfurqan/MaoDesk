export const EnvToken = Symbol("Env");

export default interface Env {
  apiUrl: string;
  supabaseAnonKey: string;
  supabaseObatTable: string;
}
