import axios, { AxiosResponse } from "axios";
import Toast from "../../components/common/Toast";
import { IRequest } from "../type/IRequest";
import { getToken, removeToken } from "../utils/util";

export const axiosInstance = axios.create({
  timeout: 60 * 1000,
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Methods": " GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/** Add a request interceptor */
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = getToken();
    if (
      token &&
      config.url &&
      !config.url.includes("/login") &&
      !config.url.includes("/register")
    ) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    const requestError = error.response;
    handleGlobalError(requestError, "requestError");
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    handleGlobalError(response, "response");
    return response;
  },
  (error) => {
    if (error.code === "ERR_NETWORK") {
      Toast(
        `Uh-oh we're having trouble connecting right now. Please check your internet connection and try again.`,
        "error",
      );
    }
    const responseError = error.response;
    handleGlobalError(responseError, "responseError");
    return Promise.reject(error);
  },
);

const handleGlobalError = (response: any, errorFrom: string) => {
  if (
    (errorFrom === "response" || errorFrom === "responseError") &&
    response?.config?.handleError
  ) {
    if (response && response.status === 404) {
      Toast("System error occurred: URL not found", "error");
      return;
    }

    const errorObject = response.data;
    try {
      // if (errorObject && errorObject.message) {
      //   Toast(`${errorObject.message}`, "error");
      // } else
      if (
        errorObject &&
        typeof errorObject === "object" &&
        errorObject.errors
      ) {
        // Handle validation errors
        const errors = errorObject.errors;
        if (errors) {
          // Loop through each error and show the message
          for (const field in errors) {
            if (Object.hasOwnProperty.call(errors, field)) {
              // Show each error message from the response
              const errorMessage = errors[field].join(", "); // Join array messages if more than one
              Toast(`${errorMessage}`, "error");
            }
          }
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Handle any unforeseen errors
      Toast("System error occurred, please try later", "error");
    }
  }

  if (response && response.status === 403) {
    removeToken();
    window.location.href = "/";
  }
  if (response && response.status === 500) {
    Toast("Server error occured!", "error");
  }
};

export type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "purge"
  | "PURGE"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";

/**
 * Common method to make API request
 * @param {String} url Url
 * @param {String} method Request Methods, default `POST`
 * @param {Object} params Parameters that has to be sent in API
 * @param {boolean} handleError Flag to indicate to handleError automatically or not by default `true`
 * @param {boolean} useAsParams Flag to indicate to send data as params `true`
 * @return {Promise} returns Promise
 */

export async function request<T, R>({
  url,
  method,
  params,
  cancelToken,
  headerConfig,
  handleError = true,
  useData = false,
  isFormData = false,
  credentialsConfig = true,
}: IRequest<T>): Promise<R | any> {
  try {
    let requestDataOrParams;
    if (useData) {
      requestDataOrParams = isFormData ? convertToFormData(params) : params;
    } else {
      requestDataOrParams = params || {};
    }
    const config = {
      method: method || "POST",
      url: url,
      handleError: handleError,
      [useData ? "data" : "params"]: requestDataOrParams,
    };

    if (isFormData) {
      config.headers = {
        "Content-Type": "multipart/form-data",
      };
    }

    if (cancelToken) {
      config.cancelToken = cancelToken.token;
    }

    if (headerConfig) {
      config.headers = headerConfig;
    }

    if (!credentialsConfig) {
      config.withCredentials = credentialsConfig;
    }

    const response = await axiosInstance.request(config);

    if (response) {
      return response.data;
    } else {
      throw new Error("No response received");
    }
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function requestWithFormData(
  url: string,
  method: Method,
  params: FormData,
  handleError = true,
) {
  try {
    const config = {
      method: method || "POST",
      url: url,
      handleError: handleError,
      data: params || {},
    };

    return await axiosInstance.request(config).then((response) => {
      if (response) {
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(response);
      }
    });
  } catch (err) {
    return Promise.reject(err);
  }
}
const convertToFormData = <T>(params: T): FormData | string => {
  const form_data = new FormData();

  if (typeof params === "string") {
    return params;
  }

  for (const key in params) {
    if (typeof params[key] === "string") {
      form_data.append(key, params[key] as string);
    } else if (Array.isArray(params[key])) {
      if ((params[key] as unknown[]).length === 1) {
        form_data.append(key, (params[key] as unknown[])[0] as string | Blob);
      } else {
        (params[key] as unknown[]).forEach((element) => {
          form_data.append(`${key}[]`, element as string | Blob);
        });
      }
    } else {
      form_data.append(key, params[key] as string | Blob);
    }
  }

  return form_data;
};
