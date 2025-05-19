import React, { useState } from 'react';

function App() {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!address) {
      alert("Please enter a wallet address.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`http://127.0.0.1:8000/analyze?address=${address}`);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Failed to fetch data." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "auto" }}>
      <h1>Solana Wallet Analyzer</h1>

      <input
        type="text"
        placeholder="Enter Solana wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", fontSize: "1rem", marginBottom: "1rem" }}
      />
      <button onClick={handleAnalyze} style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}>
        Analyze
      </button>

      {loading && <p>Analyzing...</p >}

      {result && result.error && (
        <p style={{ color: "red" }}>Error: {result.error}</p >
      )}

      {result && result.address && (
        <div style={{ marginTop: "2rem", backgroundColor: "#f5f5f5", padding: "1rem", borderRadius: "8px" }}>
          <h2>Analysis Result</h2>
          <p><strong>Address:</strong> {result.address}</p >
          <p><strong>Transaction Count:</strong> {result.tx_count}</p >
          <p><strong>Buy Total:</strong> {result.buy_total} SOL</p >
          <p><strong>Sell Total:</strong> {result.sell_total} SOL</p >
          <p><strong>Fees Paid:</strong> {result.fee_total} SOL</p >
          <p><strong>Net Profit:</strong> {result.net_profit} SOL</p >
        </div>
      )}
    </div>
  );
}

export default App;