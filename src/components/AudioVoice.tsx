import { Avatar, InputNumberProps, Slider } from "antd";
import { Volume2 } from "lucide-react";
import { useState } from "react";

const AudioVoice = () => {
  const [inputVolume, setInputVolume] = useState(1);
  const volumeOnChange: InputNumberProps["onChange"] = (newValue) => {
    setInputVolume(newValue as number);
  };
  return (
    <div className="audio-voice">
      <div className="audio-voice-container">
        <div
          className="flex flex-row justify-between"
          style={{ width: "100%" }}
        >
          <div className="flex flex-row justify-between items-center">
            <Avatar src="/alex.jpg" style={{ marginRight: 4 }} /> Alex
          </div>
          <div className="flex flex-row justify-between items-center">
            <Avatar
              onClick={() => {}}
              icon={<Volume2 size={16} color="#aaa" />}
              shape="square"
              className="audio-voice-volume-icon"
              size="small"
              style={{ marginRight: 4 }}
            />
            <Slider
              min={1}
              max={100}
              onChange={volumeOnChange}
              className="audio-voice-slider"
              value={inputVolume}
              style={{ width: 70 }}
              styles={{
                track: {
                  background: "#1db954",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioVoice;
