'use client'

import { useEffect, useState } from "react"; 
import useSound from "use-sound"; // for handling the sound
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import { IconContext } from "react-icons"; // for customazing the icons

interface PlayerProps {
  seconds: number;
  setSeconds: (value: number) => void;
}

export default function Player({seconds, setSeconds}:PlayerProps) {
  
    const fmttm = '/assets/audios/fmttm.mp3'; 
    
    const [isPlaying, setIsPlaying] = useState<boolean>(false); // state for play/pause
    //const [seconds, setSeconds] = useState<number>(0); // current position of the audio in seconds
    const [play, { pause, duration, sound}] = useSound(fmttm); // for playing the sound

    const playingButton = () =>{
        setIsPlaying(!isPlaying); // toggle play/pause
        if (isPlaying) {
            pause(); // pause the sound
        } else {
            play(); // play the sound
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([]));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [sound]);

    return (
      <div className="absolute w-full px-4">
        <div className="flex justify-center space-x-4">
          {!isPlaying ? (
            <button className="playButton cursor-pointer" onClick={playingButton}>
              <IconContext.Provider value={{ size: "3em", color: "#f2f2f2" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </button>
          ) : (
            <button className="playButton cursor-pointer" onClick={playingButton}>
              <IconContext.Provider value={{ size: "3em", color: "#f2f2f2" }}>
                <AiFillPauseCircle />
              </IconContext.Provider>
            </button>
          )}
        </div>
        <div className="w-full px-10">
          <input
            type="range"
            min="0"
            max={(duration ?? 0) / 1000}
            defaultValue="0"
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