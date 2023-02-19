import Image from "next/image";

function Story({ img, username }) {
  return (
    <div className="space-y-2">
      <div
        className="h-16 w-16 bg-gradient-to-tr from-amber-300 via-red-500 to-fuchsia-700
        rounded-full p-[2px] cursor-pointer hover:scale-110 transition-all duration-200 ease-out"
      >
        <div className="p-[2px] bg-white dark:bg-black rounded-full">
          <img className="rounded-full" src={img} alt="" />
        </div>
      </div>
      <p className="text-xs w-16 truncate text-center">{username}</p>
    </div>
  );
}

export default Story;
