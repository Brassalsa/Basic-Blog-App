"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const AuthLinks = () => {
  const { status } = useSession();

  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <>
      {status == "authenticated" ? (
        <>
          <Link href="/write" className="hidden sm:block">
            Write
          </Link>
          <Link href={"/account"} className="hidden sm:block">
            Dashboard
          </Link>
        </>
      ) : (
        <Link href="/login" className="hidden sm:block">
          Login
        </Link>
      )}

      {/* Hamburger Menu -> */}
      <div
        className="w-5 h-4 flex flex-col justify-between cursor-pointer sm:hidden justify-self-end self-center "
        onClick={toggle}
      >
        <div className="w-full h-[2px] bg-primText"></div>
        <div className="w-full h-[2px] bg-primText"></div>
        <div className="w-full h-[2px] bg-primText"></div>
      </div>
      {open && (
        <div className="w-auto overflow-x-hidden sm:hidden">
          <div
            className={`absolute z-40 top-24 left-0 bg-primBg h-full w-full flex flex-col gap-3 text-3xl items-center justify-items-end
            `}
          >
            <Link href="/" className="" onClick={toggle}>
              Homepage
            </Link>
            <Link href="/about" className="" onClick={toggle}>
              About
            </Link>
            <Link href="/contact" className="" onClick={toggle}>
              Contact
            </Link>

            {status === "authenticated" ? (
              <>
                <Link href="/write" onClick={toggle}>
                  Write
                </Link>
                <Link href="/account">Dashboard</Link>
              </>
            ) : (
              <Link href="/login" onClick={toggle}>
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AuthLinks;
