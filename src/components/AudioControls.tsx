import { Play, SkipBack, SkipForward, Pause } from "lucide-react";
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return minutes || seconds
    ? `${minutes}:${seconds.toString().padStart(2, "0")}`
    : "00:0";
};

const AudioControls = ({
  audioPlayer,
  isPlaying,
  handleNext,
  handlePrevious,
  totalTime,
  currentTime,
}: {
  audioPlayer: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  totalTime: number;
  currentTime: number;
  handleNext: () => void;
  handlePrevious: () => void;
}) => {
  // console.log(formatTime(currentTime));
  return (
    <div className="audio-controls">
      <div className="audio-control-center">
        <SkipBack
          size={18}
          className="audio-control-icon"
          onClick={handlePrevious}
        />
        {isPlaying ? (
          <Pause
            size={18}
            className="audio-control-icon"
            onClick={() => {
              if (audioPlayer.current) {
                audioPlayer.current.pause();
              }
            }}
          />
        ) : (
          <Play
            size={18}
            className="audio-control-icon"
            onClick={() => {
              console.log("audioPlayer.current", audioPlayer.current);
              if (audioPlayer.current) {
                audioPlayer.current.play();
              }
            }}
          />
        )}
        <SkipForward
          size={18}
          className="audio-control-icon"
          onClick={handleNext}
        />
        <div className="audio-control-time">
          <span className="current-time">{formatTime(currentTime)}</span> /
          <span style={{ width: "30px", marginLeft: 2 }}>
            {" "}
            {formatTime(totalTime)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AudioControls;
