import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import audio from "../../public/audio.mp3";

type Props = {
  peaks: number[];
};

const WaveformFromJsonOnly = ({ peaks }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Init WaveSurfer
    waveSurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#0000001f",
      progressColor: "#0000001f", // No actual progress
      interact: false,
      cursorWidth: 0,
      height: 40,
      url: audio,
    });

    // Load fake audio with peak data only
    waveSurferRef.current.load("", [peaks]);

    return () => waveSurferRef.current?.destroy();
  }, [peaks]);

  return <div ref={containerRef} />;
};

export default WaveformFromJsonOnly;
