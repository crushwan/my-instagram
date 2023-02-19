import "./globals.css";
import Header from "@/components/Header";
import { SessionProvider } from "@/components/SessionProvider";
import ClientProvider from "@/components/ClientProvider";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import CreatePost from "@/components/CreatePost";

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head />
      <body className="grid grid-cols-11">
        <SessionProvider session={session}>
          <ClientProvider />
          <div className="col-span-2">
            <Header />
          </div>
          <div className="col-span-9">{children}</div>
          <CreatePost />
        </SessionProvider>
      </body>
    </html>
  );
}
