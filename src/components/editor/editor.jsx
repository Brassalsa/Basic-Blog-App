import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import { useRef, useEffect } from "react";

const Editor = ({ content, setContent }) => {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: "edit",
        onReady: (e) => {
          ref.current = editor;
        },
        data: content,
        placeholder: "Tell your story",
        onChange: async (e) => {
          const data = await e.saver.save();
          setContent(data);
        },

        tools: {
          header: Header,
          list: List,
          quote: Quote,
        },
      });
    }

    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);
  return (
    <div
      id="edit"
      className="border-2 border-gray-500 rounded-md py-2 pl-16"
    ></div>
  );
};

export default Editor;
