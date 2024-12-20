import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { getToken, removeToken, setToken } from "../common/utils/util";
import { useNavigate } from "react-router-dom";

interface IAuthContext {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  token: string | undefined;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token: string) => {
    setToken(token);
    setIsLoggedIn(true);
    setUserToken(token);
    navigate("/task");
  };

  const logout = async () => {
    removeToken();
    setIsLoggedIn(false);
    setUserToken(undefined);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        token: userToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
