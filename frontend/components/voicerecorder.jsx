import React, { useState } from "react";
import { ReactMic } from "react-mic";

export default function VoiceRecorder({ onStopRecording }) {
  const [recording, setRecording] = useState(false);

  return (
    <div>
      <ReactMic
        record={recording}
        onStop={onStopRecording}
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
      <button onClick={() => setRecording(true)}>Start</button>
      <button onClick={() => setRecording(false)}>Stop</button>
    </div>
  );
}