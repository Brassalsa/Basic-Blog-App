import Image from "next/image";
import Link from "next/link";
import React from "react";
import setBg from "@/utils/setRandombg";

const BlogTitle = ({
  title = "123",
  url = "#",
  imgSrc = "/p1.jpeg",
  category = "travel",
  author = "John",
  date = "11.12.2022",
  withImage = true,
}) => {
  return (
    <Link href={url} className="relative flex items-center gap-5">
      {withImage && (
        <div className="relative flex-1 aspect-[1/1]">
          <Image
            src={imgSrc}
            alt="img"
            fill
            className="object-cover border-[3px] border-softClr rounded-full"
            sizes="10vw"
          />
        </div>
      )}
      <div className="flex-[4] flex flex-col gap-1">
        <span
          style={{ background: setBg() }}
          className="text-black px-2 py-1 w-max rounded-lg text-xs"
        >
          {category}
        </span>
        <h4 className=" font-medium text-softClr">{title.substring(0, 25)} </h4>
        <div className="flex flex-col text-sm text-softClr">
          <span className="font-semibold">{author}</span>
          <span className="font-light">{date}</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogTitle;
