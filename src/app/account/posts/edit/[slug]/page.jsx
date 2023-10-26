import { getPostData } from "@/app/posts/[slug]/page";
import Write from "@/app/write/page";

const EditPost = async ({ params }) => {
  const { slug } = params;
  const data = await getPostData(slug);

  return <Write data={data} />;
};

export default EditPost;
