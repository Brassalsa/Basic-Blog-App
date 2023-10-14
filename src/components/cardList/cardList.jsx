import React from "react";
import Card from "./single/card";
import Pagination from "../pagination/pagination";

const getData = async (page, cat) => {
  const res = await fetch(
    `${process.env.SERVER}/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const CardList = async ({ page = 1, cat }) => {
  const { posts, POST_PER_PAGE, count } = await getData(page, cat);

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className="flex-[5] ">
      {(posts.length > 0 && (
        <>
          <h1 className=" my-12 capitalize ">{cat || "Recent"} Posts</h1>
          <div className=" flex flex-col gap-5">
            {posts?.map((post) => (
              <Card post={post} key={post.id} />
            ))}
          </div>
          <Pagination
            page={page}
            hasNext={hasNext}
            hasPrev={hasPrev}
            cat={cat}
          />
        </>
      )) || (
        <h4 className=" my-14  w-max text-center h-96 mx-auto">
          Nothing to Show
        </h4>
      )}
    </div>
  );
};

export default CardList;
