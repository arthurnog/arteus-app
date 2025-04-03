'use client'

// import { useEffect, useState } from "react"; 
// import useSound from "use-sound"; // for handling the sound
// import fmttm from "../../public/assets/audios/fmttm.mp3";
// import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
// import { IconContext } from "react-icons"; // for customazing the icons

// export default function Player() {
//     const [isPlaying, setIsPlaying] = useState(false); // state for play/pause
//     const [play, { pause, duration, sound}] = useSound(fmttm); // for playing the sound

//     const playingButton = () =>{
//         setIsPlaying(!isPlaying); // toggle play/pause
//         if (isPlaying) {
//             pause(); // pause the sound
//         } else {
//             play(); // play the sound
//         }
//     }

//     const [currTime, setCurrTime] = useState({
//         min: "",
//         sec: "",
//       }); // current position of the audio in minutes and seconds

//     const [time, setTime] = useState({
//         min: "",
//         sec: "",
//       });
    
//     const [seconds, setSeconds] = useState(); // current position of the audio in seconds

//     useEffect(() => {
//         const sec = (duration ?? 0)/1000;
//         const min  = Math.floor(sec/60);
//         const secRemain = Math.floor(sec%60);
//         setTime({
//             min: min.toString(),
//             sec: secRemain.toString()
//         })
//     }, [duration]);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             if (sound) {
//                 setSeconds(sound.seek([]));
//                 const min = Math.floor(sound.seek([])/60);
//                 const sec = Math.floor(sound.seek([])%60);
//                 setCurrTime({
//                     min: min.toString(),
//                     sec: sec.toString(),
//                 });
//             }
//         }, 1000);
//         return () => clearInterval(interval);
//     }, [sound]);

//     return (
//       <>
//         <div className="flex justify-center space-x-4">
//           {!isPlaying ? (
//             <button className="playButton" onClick={playingButton}>
//               <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
//                 <AiFillPlayCircle />
//               </IconContext.Provider>
//             </button>
//           ) : (
//             <button className="playButton" onClick={playingButton}>
//               <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
//                 <AiFillPauseCircle />
//               </IconContext.Provider>
//             </button>
//           )}
//         </div>
//         <div>
//           <div className="time">
//             <p>
//               {currTime.min}:{currTime.sec}
//             </p>
//             <p>
//               {time.min}:{time.sec}
//             </p>
//           </div>
//           <input
//             type="range"
//             min="0"
//             max={(duration ?? 0) / 1000}
//             defaultValue="0"
//             value={seconds}
//             className="timeline"
//             onChange={(e) => {
//               sound.seek([e.target.value]);
//             }}
//           />
//         </div>
//       </>
//     );
// }

const audioUrl = '/assets/audios/fmttm.mp3'; 

export default function Player() {
  return (<audio src={audioUrl} controls />)
}