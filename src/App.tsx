import React from 'react';
import { useSelector } from "react-redux";
import { ApplicationState } from "./store";
import { SourceCode } from "./SourceCode";
import Controls from "./Controls";


function App() {
  const languageInput = useSelector((state: ApplicationState) => state.languageInput);
  const isLoading = useSelector((state: ApplicationState) => state.isLoading);
  const sourceCode = useSelector((state: ApplicationState) => state.sourceCode);
  const error = useSelector((state: ApplicationState) => state.error);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Code Printer</h1>
        <Controls />
      </header>
      {isLoading && <p>Loading ...</p>}
      {error && <p>{error.message}</p>}
      {sourceCode && <SourceCode sourceCode={sourceCode} language={languageInput} />}
    </div>
  );
}

export default App;
