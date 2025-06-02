'use client'

import { useEffect, useRef, useState } from "react";
import { lyrics } from "../../public/assets/lyrics/fmttm.json"; // import the lyrics from the json file

function useCurrentLine(timestamp: number) {
    type Line = (typeof lyrics.lines)[number];
    const [currentLine, setCurrentLine] = useState<Line | null>(null);
  
    useEffect(() => {
      const nextLineIndex = lyrics.lines.findIndex(
        (line) => Number(line.startTimeS) > timestamp
      );
  
      if (nextLineIndex === 0) {
        setCurrentLine(lyrics.lines[0]);
      }
  
      setCurrentLine(lyrics.lines[nextLineIndex - 1]);
    }, [timestamp]);
  
    return { currentLine };
}

interface LyricsProps {
    timeStamp: number;
}

export default function Lyrics({timeStamp}:LyricsProps) {
    const currentLineRef = useRef<HTMLParagraphElement>(null);
    const currentLine = useCurrentLine(timeStamp);

    useEffect(() => {
        if (currentLineRef.current) {
            currentLineRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [currentLine]);

    return(
        <div className="grid gap-5 text-left mx-auto w-[90%] h-90 overflow-y-auto [-ms-overflow-style:none] 
                      [scrollbar-width:none] 
                      [&::-webkit-scrollbar]:hidden">
            {lyrics.lines.map((line) => {
                const isCurrentLine = currentLine?.currentLine?.startTimeS === line.startTimeS;
                const isPastLine = Number(line.startTimeS) < timeStamp;
                const textColor = isCurrentLine ? "text-white" : isPastLine ? "text-gray-400" : "text-black";

                return(
                    <p
                        ref={isCurrentLine ? currentLineRef : null}
                        className={`font-bold text-sm md:text-6xl lg:text-10xl xl:text-12xl w-[90%] ${textColor}`}
                        key={line.startTimeS}
                    >
                        {line.words}
                    </p>
                );
            })}
        </div>
    );

}