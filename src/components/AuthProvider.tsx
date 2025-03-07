import { createContext, useContext, useState, useEffect } from "react";
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

  const [localUser, setLocalUser] = useState(authUser || null);

  useEffect(() => {
    if (authUser) {
      setLocalUser(authUser);
    }
  }, [authUser]);

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
        user: localUser || authUser,
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
