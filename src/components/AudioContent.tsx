import { TContent } from "../types/types";
import AudioControls from "./AudioControls";
import AudioVoice from "./AudioVoice";
import TimeMarker from "./TimeMarker";
import TimeRuler from "./TimeRuler";
import WaveformPlayer from "./WaveformPlayer";

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
          <div className="waveform-wrapper">
            <TimeRuler
              setCurrentTime={setCurrentTime}
              durationArray={durationArray}
            />
            <TimeMarker
              durationArray={durationArray}
              audioPlayerIndex={audioPlayerIndex}
              isPlaying={isPlaying}
              currentTime={currentTime}
            />
            <WaveformPlayer content={content} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioContent;
