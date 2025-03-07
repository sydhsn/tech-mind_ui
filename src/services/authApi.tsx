import { AUTH_ACTIONS, METHOD } from "../page/constants";
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
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const authApi = apiGateway.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        actionName: AUTH_ACTIONS.LOGIN,
        methodType: METHOD.POST,
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterCredentials>({
      query: (credentials) => ({
        actionName: AUTH_ACTIONS.REGISTER,
        methodType: METHOD.POST,
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        actionName: AUTH_ACTIONS.LOGOUT,
        methodType: METHOD.POST,
      }),
    }),
    updateProfile: builder.mutation({
      query: (formData) => ({
        actionName: AUTH_ACTIONS.UPDATE_PROFILE(
          formData.get("userId") as string
        ),
        methodType: METHOD.PUT,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
} = authApi;
