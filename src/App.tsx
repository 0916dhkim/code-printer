import React, { useState } from 'react';

function App() {
  const [urlInput, setUrlInput] = useState("");
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
            <input type="url" name="url" value={urlInput} onChange={e => setUrlInput(e.target.value)} />
          </label>
          <input type="submit" value="Render" />
        </form>
      </header>
    </div>
  );
}

export default App;
