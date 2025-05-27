import { Dispatch, SetStateAction } from "react";
import { TContent } from "../types/types";
import TranscriptContent from "./TranscriptContent";

const Transcript = ({
  content,
  setContent,
  handleAudioGeneration,
}: {
  content: TContent[];
  setContent: Dispatch<SetStateAction<TContent[]>>;
  handleAudioGeneration: (voice: string, id: string) => void;
}) => {
  return (
    <div className="transcript-container">
      {content.map((item) => (
        <div key={item.id}>
          <TranscriptContent
            content={content}
            transcript={item}
            setContent={setContent}
            handleAudioGeneration={handleAudioGeneration}
          />
        </div>
      ))}
      <TranscriptContent
        key="new"
        transcript={{
          id: "",
          text: "",
          waveform: "",
          audio: "",
          voice: "",
          audioBlob: null,
        }}
        content={content}
        setContent={setContent}
        handleAudioGeneration={handleAudioGeneration}
      />
    </div>
  );
};

export default Transcript;
