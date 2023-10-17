import Image from "next/image";
import React from "react";

const Comment = ({ comment }) => {
  const { user, createdAt, desc } = comment;
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
      </div>
      <p className="text-base font-normal break-words">{desc}</p>
    </div>
  );
};

export default Comment;
