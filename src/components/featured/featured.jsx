import Image from "next/image";
import EditorOutput from "../editor/output";
import Link from "next/link";
import { links } from "@/utils/mediaLinks";
import NotFound from "@/app/not-found";

const getFeaturedPost = async () => {
  try {
    const res = await fetch(process.env.SERVER + "/api/featured", {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("Failed");
    }
    const json = await res.json();
    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const Featured = async () => {
  const post = await getFeaturedPost();

  return (
    (post && (
      <div className="mt-7">
        <h1 className="md:text-6xl text-4xl flex flex-col">
          <b>Hey {links.author} Here</b>
          <p>Discover my stories and creative ideas</p>
        </h1>
        <div className="mt-14 flex items-center gap-12 ">
          {post.img && (
            <div className="lg:block hidden relative flex-1 h-[500px] rounded-md overflow-hidden">
              <Image
                src={post.img}
                fill
                alt="img"
                sizes="50vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1 flex gap-5 flex-col">
            <h1 className="font-bold text-2xl">{post.title} </h1>
            <div className="text-lg font-light text-softClr h-24 overflow-clip">
              <EditorOutput content={post.desc} />
            </div>
            <Link
              href={`posts/${post.slug}`}
              className="rounded-md px-5 py-4 bg-softClr text-softBg w-max"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    )) || <NotFound />
  );
};

export default Featured;
