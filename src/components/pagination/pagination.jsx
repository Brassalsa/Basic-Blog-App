"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const Pagination = ({ page, hasPrev, hasNext, cat }) => {
  const router = useRouter();
  return (
    <div className="flex justify-between mt-12">
      <button
        disabled={!hasPrev}
        className="w-24 p-4 bg-softBg text-softClr cursor-pointer rounded-sm disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => router.push(`?cat=${cat || ""}&page=${page - 1}`)}
      >
        Previous
      </button>
      <button
        disabled={!hasNext}
        className="w-24 p-4 bg-softBg text-softClr cursor-pointer rounded-sm disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => router.push(`?cat=${cat || ""}&page=${page + 1}`)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
