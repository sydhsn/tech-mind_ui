import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

// Corrected BASE_URL
const BASE_URL = "http://localhost:8080/api/v1/";

const axiosBaseQuery: BaseQueryFn<
  {
    actionName: string;
    body?: Record<string, any>;
    methodType: "GET" | "POST" | "PUT" | "DELETE";
  },
  unknown,
  unknown
> = async ({ actionName, body, methodType }) => {
  try {
    const config: AxiosRequestConfig = {
      url: `${BASE_URL}${actionName}`,
      method: methodType,
      data: body,
    };

    const response = await axios(config);
    return { data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      error: axiosError.response?.data || axiosError.message,
    };
  }
};

export const apiGateway = createApi({
  reducerPath: "apiGateway",
  baseQuery: axiosBaseQuery,
  endpoints: () => ({}),
});
