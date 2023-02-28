"use client";
import Image from "next/image";
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  HeartIcon,
  PaperAirplaneIcon,
  FilmIcon,
  PlusIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import DarkModeButton from "./DarkModeButton";
import ClientSideRoute from "./ClientSideRoute";
import UserSession from "./UserSession";
import { useRecoilState } from "recoil";
import { modalState } from "atoms/modelAtom";

function Header() {
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <header className="fixed lg:w-[18%] h-screen flex flex-col justify-around border-r border-r-gray-200 dark:border-r-gray-500 shadow-sm py-7 px-3">
      <ClientSideRoute
        route="/"
        className="lg:hidden relative justify-center items-center mx-auto h-20 w-12 flex-shrink-0 cursor-pointer"
      >
        <Image
          src="../smalllogo.svg"
          fill
          className="object-contain"
          alt=""
          priority
        />
      </ClientSideRoute>

      <ClientSideRoute
        route="/"
        className="hidden lg:inline-grid relative justify-center items-center mx-auto h-20 w-36 cursor-pointer"
      >
        <Image
          src="../wordLogo.svg"
          fill
          className="object-contain"
          alt=""
          priority
        />
      </ClientSideRoute>

      <div className="flex-1">
        <div className="btn">
          <HomeIcon className="h-6 w-6" />
          <p className="btnIcon font-semibold">Home</p>
        </div>
        <div className="btn">
          <MagnifyingGlassIcon className="h-6 w-6" />
          <p className="btnIcon">Search</p>
        </div>
        <div className="btn">
          <RocketLaunchIcon className="h-6 w-6" />
          <p className="btnIcon">Explore</p>
        </div>
        <div className="btn">
          <FilmIcon className="h-6 w-6" />
          <p className="btnIcon">Reels</p>
        </div>
        <div className="btn">
          <PaperAirplaneIcon className="h-6 w-6 -rotate-45" />
          <p className="btnIcon">Messages</p>
        </div>
        <div className="relative btn">
          <HeartIcon className="h-6 w-6" />
          <div className="top-3 left-[14px] absolute rounded-full bg-red-500 h-[9px] w-[9px]" />
          <p className="btnIcon">Notifications</p>
        </div>
        <div onClick={() => setOpen(true)} className="btn">
          <PlusIcon className="h-6 w-6" />
          <p className="btnIcon">Create</p>
        </div>
        <UserSession />
      </div>

      <DarkModeButton />
    </header>
  );
}

export default Header;
