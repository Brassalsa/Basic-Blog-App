"use client";
import fetcher from "@/utils/fetcher";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Loading from "../loading";
import Error from "../error";
import Link from "next/link";

const Account = () => {
  const { status } = useSession();
  const router = useRouter();
  const { data, isLoading, error } = useSWR("/api/account", fetcher);

  if (status == "unauthenticated") {
    router.back();
    return;
  }
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  console.log(data);

  return (
    <div className="min-h-[384px]">
      {status === "authenticated" ? (
        <>
          <div className="flex justify-center">
            <h3 className="flex-1">Your Account</h3>
            <a
              className="bg-red-500 p-2 rounded-md cursor-pointer text-white"
              onClick={() => signOut()}
            >
              Logout
            </a>
          </div>
          <div>
            <h4>Details</h4>
            <Link href="/account/posts">Your Posts: {data}</Link>
          </div>
        </>
      ) : (
        <h2>Please log in first</h2>
      )}
    </div>
  );
};

export default Account;
