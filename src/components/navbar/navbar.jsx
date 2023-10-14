import AuthLinks from "../authLinks/authLinks";
import ThemeToggle from "../themeToggle/themeToggle";
import SocialLinks from "../common/socialLinks";
import NavLinks from "../common/navLinks";
import { links } from "@/utils/mediaLinks";

const Navbar = () => {
  return (
    <div className="flex items-center justify-center h-24 gap-4">
      <div className="relative h-max w-max flex-1  lg:flex gap-2  hidden">
        <SocialLinks />
      </div>
      <div className="flex-1 text-left lg:text-center text-2xl md:text-4xl  font-bold">
        {links.logo}
      </div>
      <div className=" flex gap-5  sm:text-lg text-base items-center ">
        <ThemeToggle />
        <div className="hidden gap-5 sm:flex">
          <NavLinks />
        </div>
        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
