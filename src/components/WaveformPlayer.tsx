import { Avatar } from "antd";
import waveformData from "../../public/sample.json";

import { TContent } from "../types/types";
import WaveformFromJsonOnly from "./WaveformViewer";

const caculateAproxTimeFromTextCount = (text: string) => {
  const wordCount = text.split(" ").length;
  const time = wordCount;
  return Number(time.toFixed(1));
};

const WaveformPlayer = ({
  content,
  durationArray,
}: {
  content: TContent[];
  durationArray: number[];
}) => {
  return (
    <div className="waveform-player">
      {content.map((item, index) => (
        <div
          key={item.id}
          className="waveform-player-audio"
          style={{
            width: `${
              durationArray.length > 0
                ? (Number(durationArray[index]) * 20).toFixed(0)
                : caculateAproxTimeFromTextCount(item.text) * 20
            }px`,
          }}
        >
          <div className="waveform-info">
            <Avatar
              shape="square"
              size="small"
              src="https://www.wondercraft.ai/_next/image?url=https%3A%2F%2Fwondercraft-app-thumbnails.s3.amazonaws.com%2Fvoice-images%2F15CVCzDByBinCIoCblXo.webp&w=750&q=75"
            />
            <p className="waveform-text">{item.text}</p>
            <p className="waveform-info-time">
              {durationArray.length > 0
                ? Number(durationArray[index]).toFixed(1)
                : caculateAproxTimeFromTextCount(item.text)}
            </p>
          </div>
          <div className="waveform">
            {item.waveform ? (
              <WaveformFromJsonOnly peaks={waveformData.data} />
            ) : (
              <div
                style={{
                  width: `${caculateAproxTimeFromTextCount(item.text) * 60}px`,
                  height: 36,
                }}
              ></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WaveformPlayer;
