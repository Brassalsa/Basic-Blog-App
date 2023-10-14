"use client";

import Card from "@/components/cardList/single/card";
import fetcher from "@/utils/fetcher";
import Link from "next/link";
import useSWR from "swr";

const AccountPosts = () => {
  const { data, isLoading, error } = useSWR("/api/account/posts", fetcher);
  console.log(data);
  return (
    <div className="min-h-[384px] flex flex-col gap-11">
      {data?.map((post) => (
        <div className="flex gap-3">
          <Card key={post.id} post={post} />
          <Link href="/account/posts/edit">✏️</Link>
          <Link href="/account/posts/delete">❌</Link>
        </div>
      ))}
    </div>
  );
};

export default AccountPosts;
