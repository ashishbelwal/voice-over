import { useEffect, useRef, useState } from "react";
import Ruler from "@scena/react-ruler";
import Gesto from "gesto";
import TimeMarker from "./TimeMarker";
import WaveformPlayer from "./WaveformPlayer";
import { TContent } from "../types/types";

const SCROLL_SPEED = 0.3;
const ZOOM = 20;

const TimeRuler = ({
  setCurrentTime,
  durationArray,
  currentTime,
  audioPlayerArray,
  isPlaying,
  content,
  totalTime,
  handleAudioGeneration,
}: {
  setCurrentTime: (time: number) => void;
  durationArray: number[];
  currentTime: number;
  audioPlayerArray: string[];
  isPlaying: boolean;
  content: TContent[];
  totalTime: number;
  handleAudioGeneration: (voice: string, id: string) => void;
}) => {
  const rulerWrapperRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    const gesto = new Gesto(rulerWrapperRef.current || document.body, {
      container: rulerWrapperRef.current || undefined,
    });

    gesto.on("drag", (e) => {
      setScrollX((prev) => Math.max(prev - e.deltaX * SCROLL_SPEED, 0));
    });

    return () => {
      gesto.off();
    };
  }, []);

  const handleTimeUpdate = (e: React.MouseEvent) => {
    if (!rulerWrapperRef.current) return;
    if (audioPlayerArray.length === 0) {
      setCurrentTime(0);
      return;
    }

    const rect = rulerWrapperRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const seconds = relativeX / ZOOM;
    const totalTime = durationArray.reduce((acc, curr) => acc + curr, 0);
    // console.log(Math.min(seconds, totalTime));
    setCurrentTime(Math.min(seconds, totalTime));
  };

  return (
    <div
      ref={rulerWrapperRef}
      onClick={handleTimeUpdate}
      style={{
        overflow: "hidden",
        cursor: "grab",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "inline-block",
          transform: `translateX(-${scrollX}px)`,
          transition: "transform 0.05s linear",
        }}
      >
        <TimeMarker
          currentTime={currentTime}
          totalTime={totalTime}
          isPlaying={isPlaying}
        />
        <Ruler
          type="horizontal"
          unit={5}
          zoom={ZOOM}
          backgroundColor="#fff"
          lineColor="#999"
          textColor="#333"
          height={30}
          style={{
            borderBottom: "1px solid #ddd",
            minWidth: 10000,
            width: 10000,
            marginTop: 10,
          }}
          textFormat={(scale) => `${scale}s`}
        />
        <WaveformPlayer
          content={content}
          durationArray={durationArray}
          handleAudioGeneration={handleAudioGeneration}
        />
      </div>
    </div>
  );
};

export default TimeRuler;
