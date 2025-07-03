import React, { useState, useEffect, useRef } from "react";
import Chat from "./components/Chat";
import Timeline from "./components/Timeline";
import VoiceRecorder from "./components/VoiceRecorder";

function App() {
  const [messages, setMessages] = useState([]);
  const [stage, setStage] = useState(0);
  const ws = useRef(null);

  const steps = ["Login", "Supplier", "SIM Product", "SIM Order"];

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000/ws");
    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, { sender: "Zara", text: event.data }]);
      setStage((prev) => Math.min(prev + 1, steps.length - 1));
    };
    return () => ws.current.close();
  }, []);

  const sendMessage = (msg) => {
    ws.current.send(msg);
    setMessages((prev) => [...prev, { sender: "You", text: msg }]);
  };

  const sendAudio = (blob) => {
    ws.current.send(blob.blob);
    setMessages((prev) => [...prev, { sender: "You", text: "[Voice sent]" }]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Zara CRM</h1>
      <Timeline activeStep={stage} steps={steps} />
      <Chat messages={messages} onSend={sendMessage} />
      <VoiceRecorder onStopRecording={sendAudio} />
    </div>
  );
}

export default App;