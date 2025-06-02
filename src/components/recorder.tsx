'use client'

import { useEffect } from "react"; 
import { useReactMediaRecorder } from "react-media-recorder";
import { MdRecordVoiceOver } from "react-icons/md"; // recording voice icon
import { IconContext } from "react-icons"; // for customazing the icons

interface RecorderProps {
  isPlaying: boolean;
  stopped: boolean;
  seconds?: number;
}

export default function Recorder({ isPlaying, stopped, seconds }:RecorderProps) {

  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
  } = useReactMediaRecorder({
    audio: true,
    video: false,
    onStop: (blobUrl, blob) => {
      console.log("Recording stopped:", blobUrl);
      // Cria um link temporário e força o download
      const audioURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = audioURL;
      link.download = "rec.webm"; // Nome do arquivo
      link.click(); // Dispara o download

      // Limpa o objeto URL após o download
      window.URL.revokeObjectURL(audioURL);
    },
  });

  useEffect(() => {
    if (isPlaying) {
      if (seconds === 0) {
        startRecording();
      } else {
        if (status === "recording") {
          pauseRecording();
        } else if (status === "paused") {
          resumeRecording();
        }
      }
    } else {
      if (stopped) {
        stopRecording();
      } else if (status === "recording") {
        pauseRecording();
      }
    }
  }, [isPlaying, startRecording, stopRecording, seconds, status, pauseRecording, resumeRecording, stopped]);

   return (
     <>
       {status === "recording" || status === "paused" ? (
         <IconContext.Provider value={{ size: "1em", color: "#f2f2f2" }}>
           <MdRecordVoiceOver />
         </IconContext.Provider>
       ) : null}
     </>
   );
}