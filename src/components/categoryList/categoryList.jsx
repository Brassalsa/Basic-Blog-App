import Category from "./single/singleCategory";

export const getCategories = async () => {
  const res = await fetch(`${process.env.SERVER}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed");
    return;
  }

  return await res.json();
};

const CategoryList = async () => {
  const data = await getCategories();

  return (
    <div className="my-5 ">
      <h4 className="my-5">Popular Categories</h4>
      <div className="flex gap-8 py-1 flex-wrap">
        {data?.map((cat) => (
          <Category
            key={cat.id}
            to={`/blog?cat=${cat.slug}`}
            imgSrc={cat.img}
            label={cat.title}
            withImage
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
