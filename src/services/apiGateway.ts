import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { AxiosRequestConfig, AxiosError } from "axios";
import axiosInstance from "./axiosInstance";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const axiosBaseQuery: BaseQueryFn<
  {
    actionName: string;
    body?: Record<string, any>;
    methodType: HttpMethod;
    headers?: Record<string, string>;
  },
  unknown,
  { status?: number; data?: any } // Standard RTK Query error format
> = async ({ actionName, body, methodType, headers }) => {
  try {
    const config: AxiosRequestConfig = {
      url: actionName, // No need to prepend BASE_URL since axiosInstance handles it
      method: methodType,
      data: body,
      headers: headers ?? { "Content-Type": "application/json" },
    };

    const response = await axiosInstance(config);
    return { data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError;

    return {
      error: {
        status: axiosError.response?.status,
        data: axiosError.response?.data || axiosError.message,
      },
    };
  }
};

export const apiGateway = createApi({
  reducerPath: "apiGateway",
  baseQuery: axiosBaseQuery,
  endpoints: () => ({}),
});
