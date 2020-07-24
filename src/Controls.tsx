import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState, ApplicationDispatch } from "./store";
import style from "./Controls.module.css";
import axios from "axios";

/**
 * React Component for Getting User Input.
 */
export default function Controls() {
  const dispatch = useDispatch<ApplicationDispatch>();
  const urlInput = useSelector((state: ApplicationState) => state.urlInput);
  const languageInput = useSelector((state: ApplicationState) => state.languageInput);

  async function renderCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch({ type: "START_LOADING" });

    try {
      // Parse URL input.
      const parsed = new URL(urlInput);
      const pathArray = parsed.pathname.split("/");
      if (parsed.host !== "github.com" || pathArray[3] !== "blob") {
        throw new Error("Invalid GitHub URL.");
      }

      // Convert GitHub URL to GitHub raw file URL.
      parsed.host = "raw.githubusercontent.com";
      parsed.pathname = [
        ...pathArray.slice(0, 3),
        ...pathArray.slice(4)
      ].join("/");

      // Get raw content.
      const fetchResult = await axios.get(parsed.toString());

      // Update page title.
      document.title = pathArray.slice(4).join("/");

      // Update application state.
      dispatch({ type: "LOAD_SOURCE_CODE", value: fetchResult.data });
    } catch (e) {
        let error: Error;
        if (typeof e === "string") {
          error = new Error(e);
        } else if (!(e instanceof Error)) {
          error = new Error("Failed to Load Source Code.");
        } else {
          error = e;
        }

        dispatch({ type: "FAIL_LOADING", error });
    }
  }

  return (
    <form className={style.container} onSubmit={renderCode}>
      <span className={style.label}>URL :</span>
      <input className={style.input} type="url" name="url" value={urlInput} onChange={e => dispatch({type: "SET_URL_INPUT", value: e.target.value})} />
      <span className={style.label}>Programming Language :</span>
      <input className={style.input} type="text" name="language" value={languageInput} onChange={e => dispatch({ type: "SET_LANGUAGE_INPUT", value: e.target.value })} />
      <input className={style.submit} type="submit" value="Render" />
    </form>
  );
}