"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "@/app/loading";

const AccountDelete = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { status } = useSession();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (email.length === 0) return;

    try {
      const res = await fetch(`/api/account`, {
        method: "DELETE",
        body: JSON.stringify({
          email,
        }),
      });

      if (!res.ok) {
        console.log(res);
        throw new Error("Failed");
      }
    } catch (e) {
      alert("Deltion Failed");
      return;
    }
    router.push("/");
  };
  if (status == "loading") {
    return <Loading />;
  }
  if (status == "unauthenticated") {
    router.back();
  }
  if (status === "authenticated")
    return (
      <div className="min-h-[400px] flex flex-col gap-4">
        <h1>Account Deletion</h1>
        <h4 className="text-red-400">
          Are you sure you want to delete your account
        </h4>
        <p className="text-red-500">
          When you delete your account all of your posts and comments will be
          deleted.
        </p>
        <p>If yes, Please enter your Email address</p>
        <form onSubmit={handleDelete} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-softBg w-fit rounded-md self-end mx-12 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={email.length == 0}
            onClick={handleDelete}
          >
            Send
          </button>
        </form>
        <Link href="./" className="bg-softBg p-2 rounded-md w-fit mx-auto">
          Click here to go back
        </Link>
      </div>
    );
};

export default AccountDelete;
