import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

type Props = {
  blob: Blob;
};

const WaveformViewer = ({ blob }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (!blob || !containerRef.current) return;

    const objectUrl = URL.createObjectURL(blob);

    // Cleanup previous instance
    if (waveSurferRef.current) {
      waveSurferRef.current.destroy();
      waveSurferRef.current = null;
    }

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#b4cfb4",
      height: 36,
      barWidth: 2,
      cursorColor: "transparent",
    });

    waveSurferRef.current = wavesurfer;

    wavesurfer.load(objectUrl);

    return () => {
      wavesurfer.destroy();
      URL.revokeObjectURL(objectUrl);
    };
  }, [blob]);

  return <div ref={containerRef} />;
};

export default WaveformViewer;
