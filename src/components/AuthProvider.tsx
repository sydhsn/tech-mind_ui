import { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/authSlice";
import { RootState } from "../store/store";

const AuthContext = createContext<any>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogin = (userData: any) => {
    dispatch(login(userData));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AuthContext.Provider
      value={{
        user: { ...user },
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
