import { getProviders } from "next-auth/react";
import Image from "next/image";
import SignInComponents from "../../../components/SignInComponents";

async function login() {
  const providers = await getProviders();

  return (
    <div className="flex flex-col items-center justify-center mx-auto h-screen">
      <div className="pb-10">
        <Image
          className="rounded-full mx-2 object-cover"
          width={300}
          height={200}
          src="../wordLogo.svg"
          alt="logo"
        />
      </div>
      <SignInComponents providers={providers} />
    </div>
  );
}

export default login;
