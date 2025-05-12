import { Avatar } from "antd";
import waveformData from "../../public/sample.json";

import { TContent } from "../types/types";
import WaveformFromJsonOnly from "./WaveformViewer";

const WaveformPlayer = ({ content }: { content: TContent[] }) => {
  return (
    <div className="waveform-player">
      {content.map((item) => (
        <div
          key={item.id}
          className="waveform-player-audio"
          style={{ width: 200 }}
        >
          <div className="waveform-info">
            <Avatar
              shape="square"
              size="small"
              src="https://www.wondercraft.ai/_next/image?url=https%3A%2F%2Fwondercraft-app-thumbnails.s3.amazonaws.com%2Fvoice-images%2F15CVCzDByBinCIoCblXo.webp&w=750&q=75"
            />
            <p className="waveform-text">{item.text}</p>
            <p className="waveform-info-time">0.05</p>
          </div>
          <div className="waveform">
            <WaveformFromJsonOnly peaks={waveformData.data} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WaveformPlayer;
