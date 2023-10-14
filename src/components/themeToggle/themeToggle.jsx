"use client";

import { ThemeContext } from "@/context/themeContext";
import { useContext } from "react";

const ThemeToggle = () => {
  const { theme, toggle } = useContext(ThemeContext);
  const position = theme == "light" ? " right-[1px]" : "left-[1px]";

  return (
    <div
      onClick={toggle}
      className="flex justify-between items-center border border-primText relative cursor-pointer rounded-full overflow-hidden scale-75 bg-softClr"
    >
      <div className="">🌙</div>
      <div
        className={`rounded-full  w-[45%] absolute aspect-[1/1]  bg-primBg ${position}`}
      ></div>
      <div>☀️</div>
    </div>
  );
};

export default ThemeToggle;
