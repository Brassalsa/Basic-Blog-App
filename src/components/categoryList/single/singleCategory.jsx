import Link from "next/link";
import Image from "next/image";
import setBg from "@/utils/setRandombg";

const Category = ({ to, imgSrc, label, withImage = false }) => {
  return (
    <Link
      href={to}
      className="flex justify-center items-center gap-3  px-6 py-2 rounded-md text-black w-4/5 mx-auto sm:w-max sm:mx-0"
      style={{ background: setBg() }}
    >
      {withImage && imgSrc && (
        <Image
          src={imgSrc}
          alt="style img"
          width={32}
          height={32}
          className="rounded-[50%] aspect-[1/1]"
        />
      )}
      <p className="capitalize">{label}</p>
    </Link>
  );
};

export default Category;
