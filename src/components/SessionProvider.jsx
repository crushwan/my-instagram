"use client";
import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { RecoilRoot } from "recoil";

export function SessionProvider({ children, session }) {
  return (
    <Provider>
      <ThemeProvider enableSystem={true} attribute="class">
        <RecoilRoot>{children}</RecoilRoot>
      </ThemeProvider>
    </Provider>
  );
}
