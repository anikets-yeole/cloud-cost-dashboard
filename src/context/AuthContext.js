import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";

export const AuthContext = createContext(null);

const LS_KEY = "ccd_auth";

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : { token: null, user: null };
  });

  const isAuthenticated = !!auth?.token;    //Converts any value into a boolean: true if token exists, false otherwise

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(auth));
  }, [auth]);

  const login = useCallback((payload) => setAuth(payload), []);
  const logout = useCallback(() => setAuth({ token: null, user: null }), []);

  const value = useMemo(() => ({ ...auth, isAuthenticated, login, logout }), [auth, isAuthenticated, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
