"use client";

import Image from "next/image";
import { links } from "@/utils/mediaLinks";
import Link from "next/link";
import SocialLinks from "../common/socialLinks";
import useFetchUrl from "@/utils/fetchUrl";
import NavLinks from "../common/navLinks";

const Footer = () => {
  const { data } = useFetchUrl("/api/categories");
  return (
    <div className="py-2 flex gap-7 flex-col justify-between text-softClr items-center sm:py-8 sm:flex-row">
      <div className="flex-1 flex flex-col gap-3">
        <Image
          src={links.authorImg}
          width={40}
          height={40}
          className="aspect-[1/1] rounded-full"
          alt="user img"
        />
        <h4>{links.logo}</h4>
        <p>This is a Simple blog app</p>
        <div className="flex gap-2">
          <SocialLinks />
        </div>
      </div>
      <div className="flex-1 flex w-full justify-between sm:justify-end gap-12 text-sm sm:text-base lg:gap-24">
        <div className="flex flex-col gap-5 ">
          <span className="font-bold">Links</span>
          <NavLinks />
        </div>

        <div className="flex flex-col gap-5 ">
          <span className="font-bold">Tags</span>
          {data?.map((cat) => (
            <Link
              key={cat.id}
              href={`/blog?cat=${cat.slug}`}
              className="capitalize"
            >
              {cat.title}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-5 ">
          <span className="font-bold">Social</span>
          <SocialLinks withImage={false} withText={true} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
