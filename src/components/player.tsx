'use client'

import { useEffect, useState } from "react"; 
import useSound from "use-sound"; // for handling the sound
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import { IconContext } from "react-icons"; // for customazing the icons

export default function Player() {

    const fmttm = '/assets/audios/fmttm.mp3'; 

    const [isPlaying, setIsPlaying] = useState(false); // state for play/pause
    const [play, { pause, duration, sound}] = useSound(fmttm); // for playing the sound

    const playingButton = () =>{
        setIsPlaying(!isPlaying); // toggle play/pause
        if (isPlaying) {
            pause(); // pause the sound
        } else {
            play(); // play the sound
        }
    }
    
    const [seconds, setSeconds] = useState(); // current position of the audio in seconds

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([]));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [sound]);

    return (
      <>
        <div className="flex justify-center space-x-4">
          {!isPlaying ? (
            <button className="playButton" onClick={playingButton}>
              <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </button>
          ) : (
            <button className="playButton" onClick={playingButton}>
              <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                <AiFillPauseCircle />
              </IconContext.Provider>
            </button>
          )}
        </div>
        <div>
          <input
            type="range"
            min="0"
            max={(duration ?? 0) / 1000}
            defaultValue="0"
            value={seconds}
            className="timeline"
            onChange={(e) => {
              sound.seek([e.target.value]);
            }}
          />
        </div>
      </>
    );
}