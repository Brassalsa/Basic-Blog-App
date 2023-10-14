import CardList from "@/components/cardList/cardList";
import Menu from "@/components/menu/menu";

const BlogPage = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

  return (
    <div>
      <div className="flex gap-12">
        <Menu />
        <CardList cat={cat} page={page} />
      </div>
    </div>
  );
};

export default BlogPage;
