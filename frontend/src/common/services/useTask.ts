import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "./http";
import { IEmpty } from "../type/IEmpty";
import { MutationOpt, QueryOpt } from "../type/IRequest";

export const useGetTask = (
  url: string,
  id: number | undefined,
  options?: QueryOpt<any>,
) => {
  const fn = () =>
    request<IEmpty, any>({
      url,
      method: "GET",
    });

  return useQuery({
    queryKey: ["GET_TASK", id],
    queryFn: fn,
    ...options,
  });
};

export const usePostTask = (url: string, options?: MutationOpt<any, any>) => {
  const fn = (params: any) =>
    request<any, any>({
      url,
      method: "POST",
      params,
      useData: true,
    });

  return useMutation<any, any, any>({
    mutationKey: ["POST_TASK"],
    mutationFn: fn,
    ...options,
  });
};

export const usePostSubTaskList = (
  url: string,
  options?: MutationOpt<any, any>,
) => {
  const fn = (params: any) =>
    request<any, any>({
      url,
      method: "POST",
      params,
      useData: true,
    });

  return useMutation<any, any, any>({
    mutationKey: ["POST_SUB_TASK"],
    mutationFn: fn,
    ...options,
  });
};
