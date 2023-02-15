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

function Header() {
  return (
    <header className="fixed lg:w-[18%] h-screen flex flex-col justify-around border-r border-r-gray-200 dark:border-r-gray-500 shadow-sm py-7 px-3">
      <ClientSideRoute
        route="/"
        className="lg:hidden relative justify-center items-center mx-auto h-20 w-6 flex-shrink-0 cursor-pointer"
      >
        <Image src="../logo.svg" fill className="object-contain" alt="" />
      </ClientSideRoute>

      <ClientSideRoute
        route="/"
        className="hidden lg:inline-grid relative justify-center items-center mx-auto h-24 w-24 cursor-pointer"
      >
        <Image src="../logo1.svg" fill className="object-contain" alt="" />
      </ClientSideRoute>

      <div className="flex-1">
        <div className="btn">
          <HomeIcon className="h-6 w-6" />
          <p className="btnIcon">Home</p>
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
        <div className="btn">
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
