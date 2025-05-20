// frontend/src/App.jsx

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
      const response = await fetch(`https://your-koyeb-backend-url.koyeb.app/analyze?address=${address}`);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Failed to fetch data." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", maxWidth: "900px", margin: "auto" }}>
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

      {result?.error && <p style={{ color: "red" }}>Error: {result.error}</p >}

      {result && !result.error && (
        <div style={{ marginTop: "2rem", backgroundColor: "#f5f5f5", padding: "1rem", borderRadius: "8px" }}>
          <h2>Analysis Result</h2>
          <p><strong>Address:</strong> {result.address}</p >
          <p><strong>Transaction Count:</strong> {result.tx_count}</p >
          <p><strong>Buy Total:</strong> {result.buy_total} SOL</p >
          <p><strong>Sell Total:</strong> {result.sell_total} SOL</p >
          <p><strong>Fees Paid:</strong> {result.fee_total} SOL</p >
          <p><strong>Net Profit:</strong> {result.net_profit} SOL</p >
          <p><strong>Wallet Value:</strong> {result.total_value} SOL</p >
          <p><strong>Categories:</strong> {result.categories?.join(', ')}</p >
          <p><strong>Tagged Projects:</strong> {result.tags?.join(', ')}</p >
          <p><strong>Related Addresses:</strong> {result.related_addresses?.join(', ')}</p >
          <p><strong>Security Issues:</strong> {result.risks?.join(', ') || "None"}</p >

          <h3>Advanced Filtered Transactions</h3>
          <ul>
            {result.filtered_transactions?.map((tx, i) => (
              <li key={i}>{tx.time} - {tx.amount} SOL - {tx.type}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: "3rem", borderTop: "1px solid #ccc", paddingTop: "1rem" }}>
        <h3>Support / Contact</h3>
        <p>打赏地址: <strong>AXhaUwtdcgyRUymnREPbADD5bo2dvqX1rh4WghjLpdbj</strong></p >
        <p>合作/广告请联系：</p >
        <ul>
          <li>Twitter: @adboosthub</li>
          <li>Telegram: <strong>@aiorx</strong></li>
          <li>Email: <strong>chaili45637@gmail.com</strong></li>
        </ul>
        <div style={{ marginTop: "1rem" }}>
          <h4>广告位</h4>
          <div style={{ background: "#e0e0e0", padding: "1rem", marginBottom: "1rem" }}>
            <strong>广告位一</strong>（联系邮箱投放）
          </div>
          <div style={{ background: "#e0e0e0", padding: "1rem", marginBottom: "1rem" }}>
            <strong>广告位二</strong>
          </div>
          <div style={{ background: "#e0e0e0", padding: "1rem" }}>
            <strong>广告位三</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;