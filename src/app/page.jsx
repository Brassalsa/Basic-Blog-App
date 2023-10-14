import CardList from "@/components/cardList/cardList";
import CategoryList from "@/components/categoryList/categoryList";
import Featured from "@/components/featured/featured";
import Menu from "@/components/menu/menu";

export default function Home({ searchParams }) {
  const page = +searchParams.page || 1;

  return (
    <div>
      <Featured />
      <CategoryList />
      <div className="flex gap-12">
        <CardList page={page} />
        <Menu />
      </div>
    </div>
  );
}
