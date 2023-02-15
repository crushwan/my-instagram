"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

function DarkModeButton() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div>
      {currentTheme === "dark" ? (
        <div onClick={() => setTheme("light")} className="btn">
          <SunIcon className="h-6 w-6 cursor-pointer" />
          <p className="btnIcon">Light Mode</p>
        </div>
      ) : (
        <div onClick={() => setTheme("dark")} className="btn">
          <MoonIcon className="h-6 w-6 cursor-pointer" />
          <p className="btnIcon ">Dark Mode</p>
        </div>
      )}
    </div>
  );
}

export default DarkModeButton;
