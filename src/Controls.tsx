import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState, ApplicationDispatch } from "./store";
import axios from "axios";

/**
 * Convert GitHub file URL to raw data URL.
 * @param githubUrl URL of file on GitHub.
 */
async function githubUrlToRaw(githubUrl: string): Promise<string> {
  const parsed = new URL(githubUrl);
  const pathArray = parsed.pathname.split("/");
  if (parsed.host !== "github.com" || pathArray[3] !== "blob") {
    throw new Error("Invalid GitHub URL.");
  }
  parsed.host = "raw.githubusercontent.com";
  parsed.pathname = [
    ...pathArray.slice(0, 3),
    ...pathArray.slice(4)
  ].join("/");
  return parsed.toString();
}

/**
 * React Component for Getting User Input.
 */
export default function Controls() {
  const dispatch = useDispatch<ApplicationDispatch>();
  const urlInput = useSelector((state: ApplicationState) => state.urlInput);
  const languageInput = useSelector((state: ApplicationState) => state.languageInput);
  function renderCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch({ type: "START_LOADING" });
    githubUrlToRaw(urlInput)
      .then(rawUrl => axios.get(rawUrl))
      .then(res => {
        dispatch({ type: "LOAD_SOURCE_CODE", value: res.data });
      })
      .catch(e => {
        let error: Error;
        if (typeof e === "string") {
          error = new Error(e);
        } else if (!(e instanceof Error)) {
          error = new Error("Failed to Load Source Code.");
        } else {
          error = e;
        }

        dispatch({ type: "FAIL_LOADING", error });
      });
  }

  return (
    <form onSubmit={renderCode}>
      <label>
        URL
        <input type="url" name="url" value={urlInput} onChange={e => dispatch({type: "SET_URL_INPUT", value: e.target.value})} />
      </label>
      <label>
        Programming Language
        <input type="text" name="language" value={languageInput} onChange={e => dispatch({ type: "SET_LANGUAGE_INPUT", value: e.target.value })} />
      </label>
      <input type="submit" value="Render" />
    </form>
  );
}