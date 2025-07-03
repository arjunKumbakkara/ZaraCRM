import React, { useState } from "react";

export default function Chat({ messages, onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    onSend(input);
    setInput("");
  };

  return (
    <div>
      <div style={{ height: "200px", overflowY: "scroll", border: "1px solid #ccc", marginBottom: "10px" }}>
        {messages.map((m, idx) => (
          <div key={idx}><b>{m.sender}:</b> {m.text}</div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}