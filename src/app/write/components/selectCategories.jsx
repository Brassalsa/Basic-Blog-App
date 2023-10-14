import useSWR from "swr";
import fetcher from "@/utils/fetcher";

const SelectCategories = ({ setCat, cat }) => {
  const { data: categories } = useSWR("/api/categories", fetcher);

  return (
    <select
      name="category"
      id="category"
      className="cursor-pointer bg-softBg text-softClr w-max capitalize  left-0 px-2 py-1 rounded-md "
      onChange={(e) => setCat(e.target.value)}
      placeholder="Select Category"
      value={cat}
    >
      <option
        placeholder="Category"
        className="cursor-not-allowed"
        disabled
      ></option>
      {categories?.map((i) => (
        <option
          key={i.id}
          value={i.slug}
          className="capitalize px-2 py-1 cursor-pointer"
        >
          {i.title}
        </option>
      ))}
    </select>
  );
};

export default SelectCategories;
