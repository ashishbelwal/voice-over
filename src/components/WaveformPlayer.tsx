import { Avatar, Button } from "antd";

import { TContent } from "../types/types";
import WaveformViewer from "./WaveformViewer";

const caculateAproxTimeFromTextCount = (text: string) => {
  const wordCount = text.split(" ").length;
  const time = wordCount / 2;
  return Number(time.toFixed(1));
};

const alexIcon = "/alex.jpg";
const eveIcon = "/eve.jpg";

const WaveformPlayer = ({
  content,
  durationArray,
  handleAudioGeneration,
}: {
  content: TContent[];
  durationArray: number[];
  handleAudioGeneration: (voice: string, id: string) => void;
}) => {
  return (
    <div className="waveform-player">
      {content.map((item, index) => (
        <div
          key={item.id}
          className="waveform-player-audio"
          style={{
            width: `${
              item.audioBlob
                ? (Number(durationArray[index]) * 20).toFixed(0)
                : caculateAproxTimeFromTextCount(item.text) * 20
            }px`,
          }}
        >
          <div className="waveform-info">
            <Avatar
              shape="square"
              size="small"
              src={item.voice === "Alex" ? alexIcon : eveIcon}
            />
            <p className="waveform-text">{item.text}</p>
            <p className="waveform-info-time">
              {durationArray.length > 0
                ? Number(durationArray[index]).toFixed(1)
                : caculateAproxTimeFromTextCount(item.text)}
            </p>
          </div>
          <div className="waveform">
            {item.audioBlob ? (
              <WaveformViewer blob={item.audioBlob} />
            ) : (
              <div
                style={{
                  width: `${caculateAproxTimeFromTextCount(item.text) * 60}px`,
                  height: 36,
                }}
              >
                <Button
                  size="small"
                  style={{ fontSize: 10, marginTop: 6, marginLeft: 1 }}
                  onClick={() => handleAudioGeneration(item.voice, item.id)}
                >
                  Generate
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WaveformPlayer;
