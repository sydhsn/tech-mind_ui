import { createContext, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/authSlice";
import { RootState } from "../store/store";

const AuthContext = createContext<any>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user: authUser } = useSelector(
    (state: RootState) => state.auth
  );

  // Local user state (if needed)
  const [localUser, setLocalUser] = useState(authUser || null);

  const handleLogin = (userData: any) => {
    dispatch(login(userData));
    setLocalUser(userData); // Update local user state if needed
  };

  const handleLogout = () => {
    dispatch(logout());
    setLocalUser(null); // Clear local user state if needed
  };

  return (
    <AuthContext.Provider
      value={{
        user: localUser || authUser, // Use localUser if available, otherwise fallback to authUser
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        setUser: setLocalUser, // Provide setUser function for local updates
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
