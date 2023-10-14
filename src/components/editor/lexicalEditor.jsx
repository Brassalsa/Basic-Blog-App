import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

const theme = {
  // Theme styling goes here
};

function onError(error) {
  console.error(error);
}

// function OnChangePlugin({ onChange }) {
//   const [editor] = useLexicalComposerContext();
//   useEffect(() => {
//     return editor.registerUpdateListener(({ editorState }) => {
//       onChange(editorState);
//     });
//   }, [editor, onChange]);
// }

export default function Editor({ content, setContent }) {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
  };

  function onChange(content) {
    setContent(content);
  }

  return (
    <div className="relative">
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="h-64 border-[2px] border-softBg rounded-md p-2 placeholder:text-softClr" />
          }
          placeholder={
            <input
              placeholder="Tell your Stroy"
              className="absolute top-2 left-2 text-gray-500 text-3xl  select-none bg-transparent"
              disabled
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />

        <OnChangePlugin onChange={onChange} />
      </LexicalComposer>
    </div>
  );
}
