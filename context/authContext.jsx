import { createContext, useState } from "react";

export const AuthContext = createContext();

// we will wrap the app with context provider so the app will be inside the provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };
  const logoutUser = () => {
    setToken(null);
    localStorage.clear();
  };

  return (
    // this means when we call AuthProvider in main.
    // jsx wrapping app it provides the values specified to the app.
    // ie, token,saveToken and logout will be available throughout the app, 
    // children refers to the app.
    <AuthContext.Provider value={{ token, saveToken, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
