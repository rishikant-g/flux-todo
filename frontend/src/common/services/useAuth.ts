import { request } from "./http";

import { ISignUpRequest } from "../type/body/ISignUpRequest";
import { ISignUpResponse } from "../type/model/ISignUpResponse";
import { useMutation } from "@tanstack/react-query";
import { IAxiosError } from "../type/model/IAxiosError";
import { MutationOpt } from "../type/IRequest";
import { ILoginRequest } from "../type/body/ILoginRequest";
import { ILoginResponse } from "../type/model/ILoginResponse";
import { IEmpty } from "../type/IEmpty";

export const useSingUp = (
  url: string,
  options?: MutationOpt<ISignUpRequest, ISignUpResponse>,
) => {
  const fn = (params: ISignUpRequest) =>
    request<ISignUpRequest, ISignUpResponse>({
      url,
      method: "POST",
      params,
      useData: true,
    });

  return useMutation<ISignUpResponse, IAxiosError, ISignUpRequest>({
    mutationKey: ["SIGN_UP"],
    mutationFn: fn,
    ...options,
  });
};

export const useLogin = (
  url: string,
  options?: MutationOpt<ILoginRequest, ILoginResponse>,
) => {
  const fn = (params: ILoginRequest) =>
    request<ILoginRequest, ILoginResponse>({
      url,
      method: "POST",
      params,
      useData: true,
    });

  return useMutation<ILoginResponse, IAxiosError, ILoginRequest>({
    mutationKey: ["LOGIN"],
    mutationFn: fn,
    ...options,
  });
};

export const useLogout = (
  url: string,
  options?: MutationOpt<IEmpty, IEmpty>,
) => {
  const fn = (params: string) =>
    request<string, IEmpty>({
      url,
      method: "POST",
      params,
      useData: true,
    });

  return useMutation<any, IAxiosError, any>({
    mutationKey: ["LOGOUT"],
    mutationFn: fn,
    ...options,
  });
};
