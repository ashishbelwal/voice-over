import { useEffect, useState } from "react";

const TimeMarker = ({
  durationArray,
  audioPlayerIndex,
  isPlaying,
  currentTime,
}: {
  durationArray: number[];
  audioPlayerIndex: number;
  isPlaying: boolean;
  currentTime: number;
}) => {
  return (
    <div
      className="time-marker"
      style={{
        left: `${currentTime * 60}px`,
      }}
    >
      <div className="marker-icon"></div>
    </div>
  );
};

export default TimeMarker;
