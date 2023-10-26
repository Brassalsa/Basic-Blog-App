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

  return (
    <div className="min-h-[384px]">
      {status === "authenticated" ? (
        <>
          <div className="flex justify-center mb-5">
            <h3 className="flex-1">Dashboard</h3>
            <a
              className="bg-red-400 p-2 rounded-md cursor-pointer text-white"
              onClick={() => signOut()}
            >
              Logout
            </a>
          </div>
          <div className=" flex flex-wrap gap-7 ">
            <h4 className="flex-2 w-full">Details</h4>
            <Link
              href="/account/posts"
              className="bg-softBg text-softClr rounded-md w-full p-4"
            >
              Your Posts: {data}
            </Link>
            <Link
              href={"/account/delete/"}
              className="mx-auto bg-red-500 p-2 rounded-lg cursor-pointer"
            >
              Account Deletion
            </Link>
          </div>
        </>
      ) : (
        <h2>Please log in first</h2>
      )}
    </div>
  );
};

export default Account;
