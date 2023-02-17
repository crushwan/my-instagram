"use client";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { modalState } from "atoms/modelAtom";
import { useRecoilState } from "recoil";
import { useRef, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/24/solid";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { db, storage } from "@/../firebase";

function CreatePost() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSeletedFile] = useState(null);

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    // 1. create a post and add to firestore 'posts' collection
    // 2. get the post ID for the new created post
    // 3. upload the image to firebase storage with the post ID
    // 4. get a download URL from firebase storage and update the original post with image

    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.name,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    setOpen(false);
    setLoading(false);
    setSeletedFile(null);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSeletedFile(readerEvent.target.result);
    };
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div
          className="flex items-center justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-10 text-center
        sm:block sm:p-0"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-4 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 tex-left overflow-hidden
            shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
            >
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    onClick={() => setSeletedFile(null)}
                    className="w-full object-contain cursor-pointer"
                    alt=""
                  />
                ) : (
                  <div
                    onClick={() => filePickerRef.current.click()}
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                  >
                    <CameraIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Upload a photo
                    </Dialog.Title>

                    <div>
                      <input
                        ref={filePickerRef}
                        onChange={addImageToPost}
                        type="file"
                        hidden
                      />
                    </div>

                    <div className="mt-2">
                      <input
                        className="border-none focus:ring-0 w-full text-center"
                        type="text"
                        ref={captionRef}
                        placeholder="Please enter a caption..."
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  onClick={uploadPost}
                  type="button"
                  disabled={!session || !selectedFile}
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 
                py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300
                disable:cursor-not-allowed hover:disabled:bg-gray-300"
                >
                  {loading
                    ? "Uploading..."
                    : !session
                    ? "Sign In First"
                    : "Upload Post"}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default CreatePost;

{
  /* <div className="flex flex-col mx-auto rounded-xl min-w-[300px] max-w-[400px] h-[450px] border border-gray-200">
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
            </div> */
}
