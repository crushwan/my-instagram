import {
  BookmarkIcon,
  ChatBubbleLeftIcon,
  ChatBubbleLeftRightIcon,
  FaceSmileIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import {
  EllipsisHorizontalIcon,
  HeartIcon as HeartIconFilled,
} from "@heroicons/react/24/solid";

function Post({ id, username, userImg, img, caption }) {
  return (
    <div className="my-7 border-y rounded-sm dark:border-y-gray-500">
      <div className="flex items-center p-5">
        <img
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
          src={userImg}
          alt=""
        />
        <p className="flex-1 font-bold">{username}</p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>

      <img src={img} className="object-cover w-full" />

      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          <HeartIcon className="btnPost" />
          <ChatBubbleLeftIcon className="btnPost" />
          <PaperAirplaneIcon className="btnPost -rotate-45 -mt-1" />
        </div>
        <BookmarkIcon className="btnPost" />
      </div>

      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>

      <form className="flex items-center p-4">
        <input
          className="border-none flex-1 focus:ring-0 outline-none bg-transparent"
          type="text"
          placeholder="Add a comment..."
        />
        <button className="text-blue-500 font-semibold mr-2">Post</button>
        <FaceSmileIcon className="h-6 text-gray-500" />
      </form>
    </div>
  );
}

export default Post;
