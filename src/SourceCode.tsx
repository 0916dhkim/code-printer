import React from "react";

type Props = {
  sourceCode: string
}

/**
 * React Component for Source Code Rendering.
 */
export function SourceCode({ sourceCode }: Props) {
  return <div>{sourceCode}</div>;
}
