import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState, ApplicationDispatch } from "./store";

function App() {
  const dispatch = useDispatch<ApplicationDispatch>();
  const urlInput = useSelector((state: ApplicationState) => state.urlInput);

  function renderCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    throw new Error("Not implemented.");
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Code Printer</h1>
        <form onSubmit={renderCode}>
          <label>
            URL
            <input type="url" name="url" value={urlInput} onChange={e => dispatch({type: "SET_URL_INPUT", value: e.target.value})} />
          </label>
          <input type="submit" value="Render" />
        </form>
      </header>
    </div>
  );
}

export default App;
