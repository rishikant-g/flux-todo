import {
  DefaultError,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { CancelTokenSource, Method } from "axios";

export interface IRequest<T> {
  url: string;
  method: Method;
  params?: T;
  handleError?: boolean;
  useData?: boolean;
  cancelToken?: CancelTokenSource;
  headerConfig?: Record<string, unknown>;
  isFormData?: boolean;
  isEncryption?: boolean;
  credentialsConfig?: boolean;
}

export type ApiServiceErr = DefaultError;

export type QueryOpt<R> = Omit<
  UseQueryOptions<unknown, ApiServiceErr, R>,
  "queryFn" | "queryKey"
>;

export type MutationOpt<T, R = unknown> = Omit<
  UseMutationOptions<R, ApiServiceErr, T, unknown>,
  "mutationFn" | "mutationKey"
>;
