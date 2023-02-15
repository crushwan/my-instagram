"use client";
import { getProviders, signIn } from "next-auth/react";

function SignInComponents({ providers }) {
  return (
    <div className="flex justify-center">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg"
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: process.env.VERCEL_URL || "http://localhost:3000",
              })
            }
          >
            Sign In With {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default SignInComponents;
