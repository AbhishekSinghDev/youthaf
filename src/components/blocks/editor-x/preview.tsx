"use client";

import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { SerializedEditorState } from "lexical";

import { FloatingLinkContext } from "@/components/editor/context/floating-link-context";
import { SharedAutocompleteContext } from "@/components/editor/context/shared-autocomplete-context";
import { ContentEditable } from "@/components/editor/editor-ui/content-editable";
import { editorTheme } from "@/components/editor/themes/editor-theme";
import { TooltipProvider } from "@/components/ui/tooltip";

import { nodes } from "./nodes";

const previewConfig: InitialConfigType = {
  namespace: "EditorPreview",
  theme: editorTheme,
  nodes,
  editable: false,
  onError: (error: Error) => {
    console.error("Preview error:", error);
  },
};

interface PreviewProps {
  editorSerializedState?: SerializedEditorState;
  className?: string;
}

const Preview = ({ editorSerializedState, className }: PreviewProps) => {
  if (!editorSerializedState) {
    return (
      <div className={`bg-background rounded-lg border p-4 ${className || ""}`}>
        <p className="text-muted-foreground">No content to preview</p>
      </div>
    );
  }

  return (
    <div
      className={`bg-background overflow-hidden rounded-lg border shadow ${
        className || ""
      }`}
    >
      <LexicalComposer
        initialConfig={{
          ...previewConfig,
          editorState: JSON.stringify(editorSerializedState),
        }}
      >
        <TooltipProvider>
          <SharedAutocompleteContext>
            <FloatingLinkContext>
              <RichTextPlugin
                contentEditable={
                  <ContentEditable
                    placeholder=""
                    className="ContentEditable__root relative block min-h-32 overflow-auto px-8 py-4 focus:outline-none"
                  />
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
              <ClickableLinkPlugin />
            </FloatingLinkContext>
          </SharedAutocompleteContext>
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
};

export default Preview;
