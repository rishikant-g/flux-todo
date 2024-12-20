import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "./http";
import { IEmpty } from "../type/IEmpty";
import ITaskListResponse from "../type/model/ITaskListResponse";
import { MutationOpt } from "../type/IRequest";

export const useGetTaskList = (
  url: string,
  searchString = "",
  sort_by = "asc",
) => {
  if (searchString) {
    url = url + `?search=${searchString}&sort_by=${sort_by}`;
  } else if (sort_by) {
    url = url + `?sort_by=${sort_by}`;
  }
  const fn = () =>
    request<IEmpty, ITaskListResponse>({
      url,
      method: "GET",
      handleError: false,
    });

  return useQuery({
    queryKey: ["GET_TASK_LIST", searchString, sort_by],
    queryFn: fn,
    retry: false,
  });
};

export const usePostTaskList = (
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
    mutationKey: ["POST_TASK_LIST"],
    mutationFn: fn,
    ...options,
  });
};

export const useUpdateTaskList = (
  url: string,
  options?: MutationOpt<any, any>,
) => {
  const fn = (params: any) =>
    request<any, any>({
      url,
      method: "PUT",
      params,
      useData: true,
    });

  return useMutation<any, any, any>({
    mutationKey: ["POST_UPDATE_LIST"],
    mutationFn: fn,
    ...options,
  });
};

export const useDeleteTaskList = (
  url: string,
  options?: MutationOpt<any, any>,
) => {
  const fn = (params: any) =>
    request<any, any>({
      url,
      method: "DELETE",
      params,
      useData: true,
    });

  return useMutation<any, any, any>({
    mutationKey: ["POST_TASK_LIST"],
    mutationFn: fn,
    ...options,
  });
};
