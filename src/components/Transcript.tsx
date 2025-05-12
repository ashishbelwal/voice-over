import { Dispatch, SetStateAction } from "react";
import { TContent, TContentType } from "../types/types";
import TranscriptContent from "./TranscriptContent";

const Transcript = ({
  content,
  setContentType,
  setContent,
}: {
  content: TContent[];
  setContentType: Dispatch<SetStateAction<TContentType>>;
  setContent: Dispatch<SetStateAction<TContent[]>>;
}) => {
  return (
    <div className="transcript-container">
      {content.map((item) => (
        <div key={item.id}>
          <TranscriptContent
            content={content}
            transcript={item}
            setContentType={setContentType}
            setContent={setContent}
          />
        </div>
      ))}
      <TranscriptContent
        key="new"
        transcript={{ id: "", text: "", waveform: "", audio: "", voice: "" }}
        content={content}
        setContentType={setContentType}
        setContent={setContent}
      />
    </div>
  );
};

export default Transcript;
