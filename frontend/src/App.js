import React, { useState } from 'react';

function App() {
  const [response, setResponse] = useState(null);

  const calculateSizing = async () => {
    const res = await fetch('/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clusters: [] })
    });
    const data = await res.json();
    setResponse(data);
  };

  const downloadCSV = async () => {
    const res = await fetch('/download-csv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clusters: [] })
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'sizing_details.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Nutanix NKP Sizing Guide</h1>
      <button onClick={calculateSizing}>Calculate</button>
      {response && (
        <div>
          <pre>{JSON.stringify(response, null, 2)}</pre>
          <button onClick={downloadCSV}>Download CSV</button>
        </div>
      )}
    </div>
  );
}

export default App;
