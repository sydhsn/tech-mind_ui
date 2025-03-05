import { createContext, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/authSlice";
import { RootState } from "../store/store";

const AuthContext = createContext<any>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  // Local user state (if needed)
  const [localUser, setLocalUser] = useState(user || null);

  const handleLogin = (userData: any) => {
    dispatch(login(userData));
    setLocalUser(userData);
  };

  const handleLogout = () => {
    dispatch(logout());
    setLocalUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user: localUser || user,
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        setUser: setLocalUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
