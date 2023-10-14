"use client";
import { useSession } from "next-auth/react";
import WriteComment from "./single/commentForm";
import Comment from "./single/comment";
import { Suspense } from "react";
import Loading from "@/app/loading";
import useFetchUrl from "@/utils/fetchUrl";

const Comments = ({ postSlug }) => {
  const { status } = useSession();
  const { data, isLoading, mutate } = useFetchUrl(
    `/api/comments?postSlug=${postSlug}`
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="my-12 flex flex-col gap-6">
      <h1 className="text-softClr mb-7">Comments</h1>
      <WriteComment status={status} postSlug={postSlug} onSuccess={mutate} />
      <div className="flex flex-col gap-4">
        {data?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
