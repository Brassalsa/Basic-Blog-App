"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const Comment = ({ comment, mutate }) => {
  const { user, createdAt, desc, id } = comment;
  const { data } = useSession();
  const [editMode, setEditMode] = useState(false);
  const [editDesc, setDesc] = useState(desc);

  // Editing Comment
  const editComment = async (data) => {
    try {
      const res = await fetch(`/api/comments`, {
        method: "PATCH",
        body: JSON.stringify({
          id,
          desc: editDesc,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed");
      }
    } catch (e) {
      alert("Deltion Failed");
      return;
    }
    mutate();
    setEditMode(false);
  };

  // Deleting Comment
  const delComment = async () => {
    const ans = confirm("Are You sure you want to delete your comment");
    if (!ans) {
      return;
    }
    try {
      const res = await fetch(`/api/comments`, {
        method: "DELETE",
        body: JSON.stringify({
          id,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed");
      }
    } catch (e) {
      alert("Deltion Failed");
      return;
    }
    mutate();
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-5">
        <div className="relative h-9 aspect-[1/1]">
          <Image
            src={user.image}
            width={50}
            height={50}
            className="rounded-full object-cover aspect-[1/1]"
            alt="user-image"
          />
        </div>

        <div className="flex flex-col text-sm">
          <span className="font-bold capitalize break-words">{user.name}</span>
          <span className="text-xs">{createdAt.substring(0, 10)}</span>
        </div>

        {data.user.email === user.email &&
          ((editMode && (
            <>
              <button
                className="px-2 py-1 bg-cyan-900 text-cyan-100 rounded-md font-semibold"
                onClick={editComment}
              >
                Done
              </button>
              <button
                className="px-2 py-1 bg-red-400 text-cyan-100 rounded-md font-semibold"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          )) || (
            <>
              <span
                className="justify-self-end cursor-pointer hover:opacity-75 hover:scale-110 transition-all duration-300"
                onClick={() => setEditMode(true)}
              >
                ✏️
              </span>
              <span
                className="justify-self-end cursor-pointer hover:opacity-75 hover:scale-110 transition-all duration-300"
                onClick={delComment}
              >
                🗑️
              </span>
            </>
          ))}
      </div>
      {(editMode && (
        <textarea
          placeholder="write a comment..."
          className="p-5 w-full bg-softBg text-softClr"
          onChange={(e) => setDesc(e.target.value)}
          value={editDesc}
        />
      )) || <p className="text-base font-normal break-words">{desc}</p>}
    </div>
  );
};

export default Comment;
