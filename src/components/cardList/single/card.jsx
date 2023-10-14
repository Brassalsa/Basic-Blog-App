import EditorOutput from "@/components/editor/output";
import Image from "next/image";
import Link from "next/link";

const Card = ({ post }) => {
  const { title, desc, img, createdAt, catSlug } = post;

  return (
    <div className="flex gap-12 items-center flex-1">
      {img && (
        <div className="relative h-96 aspect-[1/1] flex-1 hidden lg:block">
          <Image
            src={img}
            alt="img"
            fill
            sizes="35vw"
            className="rounded-md object-cover"
          />
        </div>
      )}
      <div className="flex-1">
        <div className="flex gap-1">
          <span className="text-softClr">{createdAt}</span>-
          <span className="text-red-400 font-medium capitalize">{catSlug}</span>
        </div>
        <div className="flex flex-col gap-5">
          <Link href={`/posts/${post.slug}`}>
            <h1 className="text-xl font-bold">{title.substring(0, 20)}</h1>
          </Link>
          <span className="capitalize text-sm font-semibold">
            {post.user && <>By {post.user.name}</>}
          </span>
          <div className="max-h-14 overflow-clip">
            <EditorOutput content={desc} className={"max-h-14 overflow-clip"} />
          </div>
          <Link
            href={`/posts/${post.slug}`}
            className=" text-softClr  border-b border-red-400 w-max py-[2px]"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
