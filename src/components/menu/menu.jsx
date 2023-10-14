import MenuCategories from "./menu-components/menuCategories";
import MenuPosts from "./menu-components/menuPosts";

const Menu = () => {
  return (
    <div className="flex-[2] mt-14 hidden lg:block">
      <h2 className="text-softClr text-sm font-normal">What&apos;s Hot</h2>

      <h1 className="text-2xl">Most Popular</h1>
      <div className="flex flex-col gap-8 py-4">
        <MenuPosts />
      </div>
      <MenuCategories />
    </div>
  );
};

export default Menu;
