"use client";
import Link from "next/link";

function ClientSideRoute({ children, route, className }) {
  return (
    <Link href={route} className={className}>
      {children}
    </Link>
  );
}

export default ClientSideRoute;
