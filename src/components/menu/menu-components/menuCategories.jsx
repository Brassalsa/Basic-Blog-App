"use client";

import Category from "@/components/categoryList/single/singleCategory";
import useFetchUrl from "@/utils/fetchUrl";
const MenuCategories = () => {
  const { data } = useFetchUrl("/api/categories");

  return (
    <div className="flex flex-wrap scale-75 items-center gap-2 font-bold">
      {data?.map((cat) => (
        <Category
          key={cat.id}
          to={`/blog?cat=${cat.slug}`}
          imgSrc={cat.img}
          label={cat.title}
        />
      ))}
    </div>
  );
};

export default MenuCategories;
