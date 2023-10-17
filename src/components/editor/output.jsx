"use client";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import { useRef, useEffect } from "react";

const EditorOutput = ({ content, className = "", id = "output-editor" }) => {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: id,
        onReady: (e) => {
          ref.current = editor;
        },
        data: JSON.parse(content),
        readOnly: true,
        tools: {
          header: Header,
          list: List,
          quote: Quote,
        },
      });
    }

    //add a return function handle cleanup
    return () => {
      ref?.current?.destroy();
    };
  }, []);
  return <div id={id} className="break-words"></div>;
};

export default EditorOutput;
