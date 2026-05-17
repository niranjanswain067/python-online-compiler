import { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [code, setCode] = useState(
`print("Hello Niranjan")`
  );

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/run`,
        {
          code: code,
        },
        { timeout: 30000 }
      );

      setOutput(response.data.output);

    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        setOutput("Error: Request timeout. The code execution took too long.");
      } else if (error.response?.status === 503) {
        setOutput(error.response.data.output);
      } else if (error.response?.status === 504) {
        setOutput(error.response.data.output);
      } else if (error.code === 'ERR_NETWORK') {
        setOutput("Error: Cannot connect to server at " + API_URL + ". Make sure the server is running.");
      } else {
        setOutput("Error: " + (error.response?.data?.output || error.message));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      <div className="header">
        <h1>Python Online Compiler</h1>
      </div>

      <div className="content">
        <div className="editor-section">
          <div className="editor-label">Code Editor</div>
          <div className="editor-wrapper">
            <Editor
              height="100%"
              defaultLanguage="python"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
              }}
            />
          </div>
        </div>

        <div className="output-section">
          <div className="output-label">Output</div>
          <div className="output">
            <pre>{output}</pre>
          </div>
        </div>
      </div>

      <div className="button-group">
        <button onClick={runCode} disabled={loading}>
          {loading ? "Running..." : "Run Code"}
        </button>
      </div>

    </div>
  );
}

export default App;