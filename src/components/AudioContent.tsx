import { TContent } from "../types/types";
import AudioControls from "./AudioControls";
import AudioVoice from "./AudioVoice";
import TimeRuler from "./TimeRuler";

const AudioContent = ({
  content,
  audioPlayer,
  isPlaying,
  handleNext,
  handlePrevious,
  totalTime,
  currentTime,
  durationArray,
  audioPlayerIndex,
  setCurrentTime,
  handleAudioGeneration,
}: {
  content: TContent[];
  audioPlayer: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  handleNext: () => void;
  handlePrevious: () => void;
  totalTime: number;
  currentTime: number;
  durationArray: number[];
  audioPlayerIndex: number;
  setCurrentTime: (time: number) => void;
  handleAudioGeneration: (voice: string, id: string) => void;
}) => {
  return (
    <div className="audio-content">
      <AudioControls
        audioPlayer={audioPlayer}
        isPlaying={isPlaying}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        totalTime={totalTime}
        currentTime={currentTime}
      />
      <div className="flex flex-row">
        <AudioVoice />
        <div className="flex flex-column waveform-container">
          <div
            className="waveform-wrapper overflow-hidden"
            style={{
              width: durationArray.reduce((acc, curr) => acc + curr, 0) * 100,
              minWidth: window.innerWidth - 100,
            }}
          >
            <TimeRuler
              content={content}
              setCurrentTime={setCurrentTime}
              durationArray={durationArray}
              currentTime={currentTime}
              audioPlayerIndex={audioPlayerIndex}
              isPlaying={isPlaying}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioContent;
