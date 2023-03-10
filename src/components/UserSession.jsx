"use client";
import { useSession } from "next-auth/react";
import ClientSideRoute from "./ClientSideRoute";
import { UserIcon } from "@heroicons/react/20/solid";

function UserSession() {
  const { data: session } = useSession();

  return (
    <ClientSideRoute route="/auth/signin" className="btn">
      {session ? (
        <img className="h-6 w-6 rounded-full" src={session?.user?.image} />
      ) : (
        <UserIcon className="h-6 w-6" />
      )}
      <p className="btnIcon truncate">
        {session ? `${session?.user?.name}` : "Sign In"}
      </p>
    </ClientSideRoute>
  );
}

export default UserSession;
