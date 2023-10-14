"use client";

import SocialLinks from "@/components/common/socialLinks";
import { links } from "@/utils/mediaLinks";
import { useState } from "react";

const ContactPage = () => {
  const [data, setData] = useState({
    email: "",
    title: "",
    desc: "",
  });

  const onChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setData({
      ...data,
      [field]: value,
    });
  };

  const handleClick = () => {
    window.location.href = `mailto:${links.authorEmail}?subject=The subject - ${data.title} (${data.email})&body=${data.desc}`;
  };

  return (
    <div>
      <h2>Contact</h2>
      <form className="flex flex-col gap-8 mt-7" onSubmit={handleClick}>
        <input
          type="email"
          placeholder="Your Email"
          className="bg-transparent border-b-[1px] border-gray-600 p-3 outline-none focus:border-b-2"
          name="email"
          id="email"
          value={data.email}
          onChange={onChange}
          required
        />
        <input
          type="text"
          placeholder="Title / Subject"
          className="bg-transparent border-b-[1px] border-gray-600 p-3 outline-none focus:border-b-2"
          name="title"
          id="title"
          value={data.title}
          onChange={onChange}
          required
        />
        <textarea
          type="text"
          placeholder="Something to say ?"
          className="bg-transparent border-b-[1px] border-gray-600 p-2 outline-none focus:border-b-2 "
          name="desc"
          id="desc"
          value={data.desc}
          onChange={onChange}
          required
        />

        <button className="bg-softBg text-softClr w-max rounded-md px-3 py-1 self-end mr-6">
          Send
        </button>
      </form>
      <h4 className="mx-auto w-max">OR</h4>
      <h3 className="mx-auto w-max">Contact with</h3>
      <div className="flex flex-wrap w-max mx-auto gap-4 my-4">
        <SocialLinks />
      </div>
    </div>
  );
};

export default ContactPage;
