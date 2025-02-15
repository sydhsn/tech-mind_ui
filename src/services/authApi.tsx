import { apiGateway } from "./apiGateway";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "teacher" | "student";
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export const authApi = apiGateway.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        actionName: "auth/login",
        methodType: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterCredentials>({
      query: (credentials) => ({
        actionName: "auth/register",
        methodType: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        actionName: "auth/logout",
        methodType: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
