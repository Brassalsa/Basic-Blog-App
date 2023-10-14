import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-64 mx-auto">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-softClr opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-primText"></span>
      </span>
    </div>
  );
};

export default Loading;
