import { AxiosRequestConfig } from "axios";

export const IHttpClientToken = Symbol("IHttpClient");

export default interface IHttpClient {
  get<ResponseType>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ResponseType>;

  head(url: string, config?: AxiosRequestConfig): Promise<Record<string, string>>;

  post<DataType, ResponseType>(
    url: string,
    data?: DataType,
    config?: AxiosRequestConfig
  ): Promise<ResponseType>;

  patch<DataType, ResponseType>(
    url: string,
    data?: DataType,
    config?: AxiosRequestConfig
  ): Promise<ResponseType>;

  delete<ResponseType>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ResponseType>;
}
