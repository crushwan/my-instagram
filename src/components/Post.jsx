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
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Moment from "react-moment";

function Post({ id, username, userImg, img, caption, timestamp }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db, id]);

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.email) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.email));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.email), {
        username: session.user.name,
      });
    }
  };

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
    <div className="my-3 border-t rounded-sm dark:border-t-gray-500">
      <div className="flex items-center p-3">
        <img
          className="rounded-full h-12 w-12 object-contain border p-[2px] mr-3"
          src={userImg}
          alt=""
        />
        <p className="text-sm font-bold truncate max-w-[150px] pr-1">
          {username.toLowerCase().replace(/\s/g, "_")}
        </p>
        <p className="flex-1 pr-5 text-xs">
          {"•  "}
          {timestamp?.toDateString().slice(3, 11)}
        </p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>

      <img src={img} className="object-cover w-full" />
      {session && (
        <div className="flex justify-between pt-3">
          <div className="flex space-x-5">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btnPost text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btnPost" />
            )}
            <ChatBubbleLeftIcon className="btnPost" />
            <PaperAirplaneIcon className="btnPost -rotate-45 -mt-1" />
          </div>
          <BookmarkIcon className="btnPost" />
        </div>
      )}

      <div className="p-1 flex flex-col">
        {likes.length > 0 && (
          <p className="font-semibold text-xs mb-1">{likes.length} likes</p>
        )}

        <p>
          <span className="font-bold text-sm mr-1">
            {username.toLowerCase().replace(/\s/g, "_")}
          </span>
          <span className="text-sm">{caption}</span>
        </p>
      </div>

      {comments.length > 0 && (
        <div className="h-20 overflow-x-hidden overflow-y-auto scrollbar-hide hover:scrollbar-default scrollbar-thin scrollbar-thumb-gray-500">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-2 mb-3">
              <img
                className="h-5 rounded-full"
                src={comment.data().userImage}
                alt=""
              />

              <p className="text-sm flex-1 break-all max-w-[390px]">
                <span className="font-semibold">
                  {comment.data().username.toLowerCase().replace(" ", "_")}{" "}
                </span>
                <span className="font-normal">
                  {comment.data().comment.slice(0, 80)}
                </span>
              </p>

              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {session && (
        <form className="flex items-center p-2">
          <input
            className="border-none flex-1 focus:ring-0 outline-none bg-transparent
            placeholder:text-sm "
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            disabled={!comment}
            onClick={sendComment}
            className="text-blue-500 text-sm font-semibold mr-2 disabled:hidden"
          >
            Post
          </button>
          <FaceSmileIcon className="h-5 text-gray-500" />
        </form>
      )}
    </div>
  );
}

export default Post;
