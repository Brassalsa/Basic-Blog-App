import NotFound from "@/app/not-found";
import Comments from "@/components/comments/comments";
import EditorOutput from "@/components/editor/output";
import Menu from "@/components/menu/menu";
import Image from "next/image";

const getData = async (slug) => {
  const res = await fetch(`${process.env.SERVER}/api/posts/${slug}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

const SinglePage = async ({ params }) => {
  const slug = params.slug;
  const post = await getData(slug);

  return (
    (post && (
      <div className=" flex flex-col gap-9">
        <div className="flex">
          <div className="flex-1 w-full">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl mb-9 break-words">
              {post.title}
            </h1>
            <div className="flex gap-4 items-center">
              {post.user?.image && (
                <div className="relative h-10 aspect-[1/1] rounded-full overflow-hidden ">
                  <Image
                    src={post?.user?.image}
                    fill
                    alt=""
                    className="object-cover"
                    sizes="10vw"
                  />
                </div>
              )}
              <div className="flex flex-col text-softClr">
                <span className="font-semibold capitalize">
                  {post.user.name}
                </span>
                <span className="text-xs">
                  {post.createdAt.substring(0, 10)}
                </span>
              </div>
            </div>
          </div>
          {post.img && (
            <div className="relative flex-1 h-80 hidden lg:block">
              <Image
                src={post.img}
                fill
                alt=""
                sizes="45vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
        <div className="flex gap-12">
          <div className="flex-[5] text-base sm:text-lg flex flex-col gap-10">
            {/* <div dangerouslySetInnerHTML={{ __html: post.desc }} /> */}
            <EditorOutput
              content={post.desc}
              className={"break-words w-full"}
            />
            <Comments comments={post.comment} postSlug={slug} />
          </div>
          <Menu />
        </div>
      </div>
    )) || <NotFound />
  );
};

export default SinglePage;
