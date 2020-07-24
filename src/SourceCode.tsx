import React, { useMemo } from "react";
import { highlight, getLanguage } from "highlight.js";
import ReactHtmlParser from "react-html-parser";
import "highlight.js/styles/xcode.css";
import style from "./SourceCode.module.css";

type Props = {
  sourceCode: string
  language: string
}

/**
 * React Component for Source Code Rendering.
 */
export function SourceCode({ sourceCode, language }: Props) {
  const selectedLanguage = useMemo(() => {
    if (getLanguage(language)) {
      return language;
    }
    // Use plaintext if there is no matching language
    // provided by highlight.js.
    return "plaintext";
  }, [language]);
  const sourceCodeLines = useMemo(() => {
    const lines = sourceCode.split("\n");
    const ret: string[] = [];
    let highlightState: Mode | undefined;
    let highlightResult: HighlightResult | undefined;
    for (let line of lines) {
      highlightResult = highlight(selectedLanguage, line, true, highlightState);
      highlightState = highlightResult.top;
      ret.push(highlightResult.value);
    }
    return ret;
  }, [sourceCode, selectedLanguage]);
  return (
    <table className={style.container}>
      <tbody>
        {sourceCodeLines.map((line, i) => (
          <tr key={i}>
            <td className={style.lineNumber}>{i + 1}</td>
            <td className={style.code}>{ReactHtmlParser(line)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
