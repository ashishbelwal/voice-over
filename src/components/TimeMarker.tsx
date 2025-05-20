import { useEffect, useRef } from "react";

const TimeMarker = ({
  currentTime,
  totalTime,
  isPlaying,
  speed = 1, // multiplier; 1 is normal, 2 is double speed, etc.
}: {
  currentTime: number;
  totalTime: number;
  isPlaying: boolean;
  speed?: number;
}) => {
  const ZOOM = 20;
  const markerRef = useRef<HTMLDivElement | null>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;

    const start = currentTime * ZOOM;
    const end = totalTime * ZOOM;
    const distance = end - start;

    const duration = (totalTime - currentTime) / speed;

    const animationName = `moveMarker-${Date.now()}`;

    // Remove old style
    if (styleRef.current) {
      styleRef.current.remove();
    }

    // Create new keyframes
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes ${animationName} {
        from { transform: translateX(${start}px); }
        to { transform: translateX(${end}px); }
      }
    `;
    document.head.appendChild(style);
    styleRef.current = style;

    // Apply animation
    marker.style.animation = `${animationName} ${duration}s linear forwards`;
    marker.style.animationPlayState = isPlaying ? "running" : "paused";
  }, [currentTime, totalTime, speed]);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.style.animationPlayState = isPlaying
        ? "running"
        : "paused";
    }
  }, [isPlaying]);

  return (
    <div className="time-marker" ref={markerRef}>
      <div className="marker-icon"></div>
    </div>
  );
};

export default TimeMarker;
