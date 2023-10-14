"use client";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "../loading";

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();
  if (status == "loading") {
    return <Loading />;
  }

  if (status == "authenticated") {
    router.back();
  }
  return (
    <div className="flex items-center justify-center lg:mt-14 mt-7">
      <div className="bg-softBg  md:py-24 md:px-36 sm:py-10 sm:px-16 p-7 flex flex-col gap-24 rounded-md text-white items-center justify-center md:font-bold md:text-lg">
        <button
          className="bg-orange-600 cursor-pointer p-5 rounded-md"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </button>
        <button
          className="bg-black cursor-pointer p-5 rounded-md"
          onClick={() => signIn("github")}
        >
          Sign in with GitHub
        </button>
        <button
          className="bg-blue-700 cursor-pointer p-5 rounded-md"
          onClick={() => signIn("facebook")}
        >
          Sign in with Facebook
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
