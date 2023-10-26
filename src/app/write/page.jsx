"use client";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Loading from "../loading";

import SelectCategories from "./components/selectCategories";
import uploadImg from "@/utils/imgUpload";
import { slugify } from "@/utils/slugify";
import SelectFile from "./components/selectFile";

import dynamic from "next/dynamic";

let Editor = dynamic(() => import("../../components/editor/editor"), {
  ssr: false,
});

const Write = ({ data }) => {
  const { status } = useSession();
  const router = useRouter();

  // title
  const [title, setTitle] = useState(data?.title || "");
  //category
  const [cat, setCat] = useState(data?.catSlug || "");
  const [err, setErr] = useState("");

  // file img
  const [file, setFile] = useState();

  const [media, setMedia] = useState(data?.img);

  // content
  const [content, setContent] = useState(JSON.parse(data?.desc || null));

  // handle submit
  const handleSubmit = async (e) => {
    const uploadPost = async (url) => {
      const res = await fetch("/api/posts/", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc: content,
          img: url || media,
          slug: slugify(title),
          catSlug: cat,
          prevTitle: data?.slug,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        setErr(json.message);
        return;
      }
      setErr("");
      router.back();
    };

    if (!(title && cat && content)) {
      setErr("Please Fill all the fields");
      return;
    }
    // upload image and then post data
    if (!file && media) {
      await uploadPost();
    } else {
      uploadImg({ file, title, setMedia, cb: uploadPost });
    }
  };

  if (status == "loading") {
    return <Loading />;
  }
  if (status == "unauthenticated") {
    router.back();
  }
  if (status === "authenticated")
    return (
      <>
        <div className="relative flex flex-col gap-8 text-primText">
          <p className="text-red-500">{err}</p>
          <button
            className="absolute right-0 bg-cyan-700 rounded-md px-2 py-1 text-white disabled:opacity-40"
            disabled={!(title && cat && content?.blocks?.length > 0)}
            onClick={handleSubmit}
          >
            Publish
          </button>

          <div className="flex gap-2 absolute left-0 px-2 py-1">
            <p className="text">Category: </p>
            <SelectCategories setCat={setCat} cat={cat} />
          </div>

          <textarea
            type="text"
            placeholder="Title"
            id="title"
            className="p-12 text-6xl bg-transparent outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="flex flex-col gap-5  min-h-[700px] ">
            <span className="flex gap-4 ">
              <SelectFile setFile={setFile} file={file} />
            </span>

            <Editor content={content} setContent={setContent} />
          </div>
        </div>
      </>
    );
};

export default Write;
