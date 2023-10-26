"use client";
import Loading from "@/app/loading";
import Card from "@/components/cardList/single/card";
import fetcher from "@/utils/fetcher";
import Link from "next/link";
import useSWR from "swr";

const AccountPosts = () => {
  const { data, isLoading, mutate } = useSWR("/api/account/posts", fetcher);
  if (isLoading) {
    return <Loading />;
  }

  function handleDelete(slug, title) {
    return async () => {
      const userRes = confirm("Are you sure you want to delete: " + title);
      if (userRes) {
        const res = await fetch(`/api/posts/${slug}`, {
          method: "delete",
        });
        if (!res.ok) {
          return;
        }
        mutate();
      }
    };
  }

  return (
    <div className="min-h-[384px] flex flex-col gap-11">
      {data?.length > 0 ? (
        data?.map((post) => (
          <div className="flex gap-3" key={post.id}>
            <Card
              post={post}
              className={"w-4/5"}
              href={`/account/posts/${post.slug}`}
            />
            <Link href={"/account/posts/edit/" + post.slug}>✏️</Link>
            <a
              className="cursor-pointer"
              onClick={handleDelete(post.slug, post.title?.substring(0, 30))}
            >
              ❌
            </a>
          </div>
        ))
      ) : (
        <h2 className="text-center my-28">Nothing to show</h2>
      )}
    </div>
  );
};

export default AccountPosts;
