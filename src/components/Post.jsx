"use client";
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
import { db } from "@/../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db]);

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.name,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="my-7 border-t rounded-sm dark:border-t-gray-500">
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
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            <HeartIcon className="btnPost" />
            <ChatBubbleLeftIcon className="btnPost" />
            <PaperAirplaneIcon className="btnPost -rotate-45 -mt-1" />
          </div>
          <BookmarkIcon className="btnPost" />
        </div>
      )}

      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>

      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                className="h-7 rounded-full"
                src={comment.data().userImage}
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>{" "}
                {comment.data().comment}
              </p>
            </div>
          ))}
        </div>
      )}

      {session && (
        <form className="flex items-center p-4">
          <input
            className="border-none flex-1 focus:ring-0 outline-none bg-transparent
            placeholder:text-sm"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            disabled={!comment}
            onClick={sendComment}
            className="text-blue-500 font-semibold mr-2 disabled:hidden"
          >
            Post
          </button>
          <FaceSmileIcon className="h-6 text-gray-500" />
        </form>
      )}
    </div>
  );
}

export default Post;
