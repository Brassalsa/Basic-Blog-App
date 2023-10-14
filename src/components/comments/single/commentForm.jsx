"use client";

import Link from "next/link";
import { useState } from "react";

const WriteComment = ({ status = "unauthenticated", postSlug, onSuccess }) => {
  const [desc, setDesc] = useState("");
  const [err, setErr] = useState();
  const handleSubmit = async () => {
    try {
      const res = await fetch(`/api/comments`, {
        method: "POST",
        body: JSON.stringify({
          desc,
          postSlug,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed");
      }
    } catch (e) {
      setErr("Something went wrong");
      return;
    }
    onSuccess();
  };
  if (status == "authenticated") {
    return (
      <div className="flex flex-col gap-1 my-3">
        <div className="flex items-center justify-between gap-7 my-5">
          <textarea
            placeholder="write a comment..."
            className="p-5 w-full bg-softBg text-softClr"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
          <button
            className="p-3 bg-cyan-900 text-cyan-100 rounded-md font-bold disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={desc === ""}
            onClick={handleSubmit}
          >
            Send
          </button>
        </div>
        <p className="text-md text-red-400">{err}</p>
      </div>
    );
  } else {
    return (
      <Link href="/login" className="">
        Login to write Comments
      </Link>
    );
  }
};

export default WriteComment;
