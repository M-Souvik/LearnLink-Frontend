import { createContext, useContext, useState, useEffect } from 'react';
import { setCookie, removeCookie, getCookie } from '@/utils/myCookie';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [authUser, setAuthUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    if(typeof window !== "undefined") {
      try {
        // Get token and user from sessionStorage safely
    
        const storedToken = sessionStorage.getItem("token");
        const storedAuthUser = sessionStorage.getItem("authUser");
  
        if (storedToken) {
          setToken(storedToken);
        }
        
        if (storedAuthUser) {
          setAuthUser(JSON.parse(storedAuthUser));
        }
      } catch (error) {
        console.error("Failed to load token or user from storage:", error);
      }
    }
   
  }, []);

  const login = (value) => {
    const user = value.user || value;
    setToken(value.token);
    setAuthUser(user);

    // Store in sessionStorage and cookies
    if(typeof window !== "undefined") {
    sessionStorage.setItem("authUser", JSON.stringify(user));
    sessionStorage.setItem("token", value.token);
    }
    setCookie("authUser", JSON.stringify(user));
    setCookie("token", value.token);
  };

  const logout = () => {
    setToken(null);
    setAuthUser(null);

    // Clear storage and cookies
    removeCookie("token");
    removeCookie("authUser");
    sessionStorage.clear();
    router.push("/");
  };

  const value = {
    token,
    authUser,
    login,
    logout,
    setToken,
    setAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
