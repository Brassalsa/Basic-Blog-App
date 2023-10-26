import Image from "next/image";
import Link from "next/link";
import EditorOutput from "@/components/editor/output";

const Card = ({ post, className, href }) => {
  const { title, img, createdAt, catSlug, user, desc, id } = post;
  const hRef = href || `/posts/${post.slug}`;
  return (
    <div className={"flex gap-12 items-center flex-1 " + className}>
      {img && (
        <div className=" hidden relative h-96 aspect-[1/1] flex-1 lg:block">
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
          <span className="text-softClr">{createdAt?.substring(0, 10)}</span>-
          <span className="text-red-400 font-medium capitalize">{catSlug}</span>
        </div>
        <div className="flex flex-col gap-5">
          <Link href={hRef}>
            <h1 className="text-xl font-bold">{title.substring(0, 20)}</h1>
          </Link>
          <span className="capitalize text-sm font-semibold">
            {user && <>By {user.name}</>}
          </span>
          <div className="text-lg font-light text-softClr overflow-clip line-2 max-h-24">
            <EditorOutput content={desc} id={id} />
          </div>
          <Link
            href={hRef}
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
