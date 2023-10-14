import BlogTitle from "../single/blogTitle";

const getPosts = async () => {
  const res = await fetch(
    `${process.env.SERVER}/api/posts?filter=views&items=6`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    console.log("Failed");
    return;
  }
  return await res.json();
};

const MenuPosts = async ({ withImage = false }) => {
  const data = await getPosts();

  return (
    <>
      {data?.posts.map((post) => (
        <BlogTitle
          key={post.id}
          withImage={withImage}
          title={post.title}
          url={`/posts/${post.slug}`}
          imgSrc={post.img}
          category={post.catSlug}
          author={post.user.name}
          date={post.createdAt}
        />
      ))}
    </>
  );
};

export default MenuPosts;
