"use client";
import LogoutButton from "./LogoutButton";
import { useSession } from "next-auth/react";

function MiniProfile() {
  const { data: session } = useSession();

  return (
    <div className="flex space-x-5 items-center ml-10">
      <img
        className="w-14 h-14 rounded-full"
        src={session?.user?.image || "../favicon.png"}
        alt="Profile Photo"
      />
      <p className="font-semibold text-sm flex-1 truncate">
        {session?.user?.name || "Welcome to Instagram"}
      </p>
      {/* <button className="font-semibold text-blue-500 text-xs">Switch</button> */}

      <LogoutButton
        style={`font-semibold text-blue-500 text-xs`}
        text={"Switch"}
      />
    </div>
  );
}

export default MiniProfile;
