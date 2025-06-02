'use client'

import { useEffect, useState } from "react"; 
import useSound from "use-sound"; // for handling the sound
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import { FaStopCircle } from "react-icons/fa";
import { IconContext } from "react-icons"; // for customazing the icons
import Recorder from "./recorder";

interface PlayerProps {
  seconds: number;
  setSecondsAction: (value: number) => void;
}

export default function Player({seconds, setSecondsAction}:PlayerProps) {
  
    const fmttm = '/assets/audios/fmttm.mp3'; 
    
    const [isPlaying, setIsPlaying] = useState<boolean>(false); // state for play/pause
    const [stopped, setStopped] = useState<boolean>(false); // state for stop
    //const [seconds, setSeconds] = useState<number>(0); // current position of the audio in seconds
    const [play, { pause, duration, sound, stop }] = useSound(fmttm); // for playing the sound

    const playingButton = () =>{
      setStopped(false); // reset the stopped state
        setIsPlaying(!isPlaying); // toggle play/pause
        if (isPlaying) {
            pause(); // pause the sound
        } else {
            play(); // play the sound
        }
    }

    const stopButton = () => {
        setStopped(true); // set the stopped state
        setIsPlaying(false); // stop the sound
        stop(); // stop the sound
        setSecondsAction(0); // reset the seconds
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                setSecondsAction(sound.seek([]));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [setSecondsAction, sound]);

    return (
      <div className="absolute w-full px-4">
        <div className="flex justify-center items-center space-x-4">
          <div className="relative inline-flex items-center">
            {!isPlaying ? (
              <button
                className="playButton cursor-pointer"
                onClick={playingButton}
              >
                <IconContext.Provider value={{ size: "3em", color: "#f2f2f2" }}>
                  <AiFillPlayCircle />
                </IconContext.Provider>
              </button>
            ) : (
              <button
                className="playButton cursor-pointer"
                onClick={playingButton}
              >
                <IconContext.Provider value={{ size: "3em", color: "#f2f2f2" }}>
                  <AiFillPauseCircle />
                </IconContext.Provider>
              </button>
            )}
            { isPlaying ? (
              <div className="absolute left-full top-1/2 -translate-y-1/2 flex items-center">
                <button
                  className="stopButton cursor-pointer ml-2"
                  onClick={stopButton}
                >
                  <IconContext.Provider value={{ size: "2em", color: "#f2f2f2" }}>
                    <FaStopCircle />
                  </IconContext.Provider>
                </button>
                <span className="ml-2">
                  <Recorder
                    isPlaying={isPlaying}
                    stopped={stopped}
                    seconds={seconds}
                  />
                </span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-full px-10">
          <input
            type="range"
            min="0"
            max={(duration ?? 0) / 1000}
            //defaultValue="0"
            value={seconds}
            className="timeline w-full cursor-pointer"
            onChange={(e) => {
              sound.seek([e.target.value]);
            }}
          />
        </div>
      </div>
    );
}