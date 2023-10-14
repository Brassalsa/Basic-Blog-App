"use client";

import { ThemeContext } from "@/context/themeContext";
import { useContext, useEffect, useState } from "react";

const ThemeProvider = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return <div className={theme + " min-h-full"}>{children}</div>;
  }
};

export default ThemeProvider;
