import SinglePage from "@/app/posts/[slug]/page";
import React from "react";

function AccountPost({ params }) {
  const { slug } = params;
  return <SinglePage params={params} />;
}

export default AccountPost;
