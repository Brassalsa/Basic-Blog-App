import Link from "next/link";
const NavLinks = () => {
  return (
    <>
      <Link href="/" className=" sm:block">
        Homepage
      </Link>
      <Link href="/about" className="sm:block">
        About
      </Link>
      <Link href="/contact" className=" sm:block">
        Contact
      </Link>
    </>
  );
};

export default NavLinks;
