export interface IAxiosError {
  message: string;
  name: string;
  stack: string;
  code: string;
  status: number;
  response: IResponseData;
}
export interface IResponseData {
  data: {
    details: string;
    message: string;
  };
}
