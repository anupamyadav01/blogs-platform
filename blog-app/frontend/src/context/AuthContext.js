import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
});

export const AuthProvider = AuthContext.Provider;

export default function useAuth() {
  return useContext(AuthContext);
}
