"use client";

import Image from "next/image";
import { useState } from "react";

const SelectFile = ({ setFile, file }) => {
  // img button
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full bg-transparent border border-softClr flex items-center justify-center"
        type="button"
      >
        <Image src="/plus.png" alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="flex gap-5">
          <input
            type="file"
            id="image"
            onChange={(e) => {
              const file = e.target.files[0];
              setFile(file);
              console.log(file);
            }}
            className="hidden"
          ></input>

          <button
            className="w-9 h-9 rounded-full bg-transparent border border-green-700 flex items-center justify-center"
            type="button"
          >
            <label htmlFor="image">
              <Image src="/image.png" alt="" width={16} height={16} />
            </label>
          </button>

          <button
            className="w-9 h-9 rounded-full bg-transparent border border-green-700 flex items-center justify-center"
            type="button"
          >
            <Image src="/external.png" alt="" width={16} height={16} />
          </button>
        </div>
      )}
      {file && (
        <p className="justify-end items-end">
          {file.name}
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => {
              setFile("");
            }}
          >
            ❌
          </button>
        </p>
      )}
    </>
  );
};

export default SelectFile;
