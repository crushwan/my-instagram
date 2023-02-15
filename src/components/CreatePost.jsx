import { PhotoIcon } from "@heroicons/react/24/outline";

function CreatePost() {
  return (
    <div className="flex flex-col rounded-xl min-w-[300px] max-w-[400px] h-[450px] border border-gray-200">
      <div className="text-center p-2 border-b border-b-gray-200">
        <p className="text-bold text-base font-semibold tracking-wide">
          Create new post
        </p>
      </div>

      <div className="flex flex-col items-center justify-center m-auto space-y-4">
        <PhotoIcon className="h-20 w-20 text-gray-800" />
        <p className="text-xl">Drag photos and videos here</p>
        <button className="bg-[#0095f6] tracking-wide rounded-lg px-5 py-2 font-semibold text-white text-sm">
          Select from computer
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
