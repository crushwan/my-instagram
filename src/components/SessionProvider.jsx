"use client";
import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export function SessionProvider({ children, session }) {
  return (
    <Provider>
      <ThemeProvider enableSystem={true} attribute="class">
        {children}
      </ThemeProvider>
    </Provider>
  );
}
