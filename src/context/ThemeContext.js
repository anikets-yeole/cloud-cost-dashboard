import React, { createContext, useState, useMemo, useEffect } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";

export const ThemeContext = createContext(null);
const LS_KEY = "ccd_theme";

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem(LS_KEY) || "light");

  useEffect(() => {
    localStorage.setItem(LS_KEY, mode);
  }, [mode]);

  const toggle = () => setMode(m => (m === "light" ? "dark" : "light"));

  const value = useMemo(() => ({ mode, toggle }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider
        theme={{
          algorithm: mode === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
