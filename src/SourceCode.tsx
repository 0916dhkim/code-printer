import React, { useMemo } from "react";

type Props = {
  sourceCode: string
}

/**
 * React Component for Source Code Rendering.
 */
export function SourceCode({ sourceCode }: Props) {
  const sourceCodeLines = useMemo(() => {
    return sourceCode.split("\n");
  }, [sourceCode]);
  return (
    <table>
      {sourceCodeLines.map((line, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <tr>{line}</tr>
        </tr>
      ))}
    </table>
  )
}
