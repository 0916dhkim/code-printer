import React from 'react';
import { useSelector } from "react-redux";
import { ApplicationState } from "./store";
import { SourceCode } from "./SourceCode";
import Controls from "./Controls";
import style from "./App.module.css";


function App() {
  const languageInput = useSelector((state: ApplicationState) => state.languageInput);
  const isLoading = useSelector((state: ApplicationState) => state.isLoading);
  const sourceCode = useSelector((state: ApplicationState) => state.sourceCode);
  const error = useSelector((state: ApplicationState) => state.error);

  return (
    <div className="App">
      <div className={style.interface}>
        <h1 className={style.heading}>Code Printer</h1>
        {isLoading
          ? <p className={style.loadingMessage}>Loading ...</p>
          : <Controls />
        }
        {error && <p className={style.errorMessage}>{error.message}</p>}
      </div>
      {sourceCode && <SourceCode sourceCode={sourceCode} language={languageInput} />}
    </div>
  );
}

export default App;
