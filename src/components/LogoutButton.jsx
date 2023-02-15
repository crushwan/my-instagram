"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

function LogoutButton({ style, text }) {
  return (
    <button onClick={() => signOut()} className={`${style}`}>
      {text}
    </button>
  );
}

export default LogoutButton;
