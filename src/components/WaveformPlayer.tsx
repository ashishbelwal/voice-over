import { Avatar, Button } from "antd";

import { TContent } from "../types/types";
import WaveformViewer from "./WaveformViewer";

const caculateAproxTimeFromTextCount = (text: string) => {
  const wordCount = text.split(" ").length;
  const time = wordCount / 2;
  return Number(time.toFixed(1));
};

const alexIcon =
  "https://www.wondercraft.ai/_next/image?url=https%3A%2F%2Fwondercraft-app-thumbnails.s3.amazonaws.com%2Fvoice-images%2F15CVCzDByBinCIoCblXo.webp&w=750&q=75";
const eveIcon =
  "https://www.wondercraft.ai/_next/image?url=https%3A%2F%2Fwondercraft-app-thumbnails.s3.amazonaws.com%2Fvoice-images%2FkPzsL2i3teMYv0FxEYQ6.webp%3FAWSAccessKeyId%3DASIA32YK37FZ5GPBSIWX%26Signature%3DM0C1%252FegG%252F9%252F8%252BlaLKAqz1%252Bl85kw%253D%26x-amz-security-token%3DIQoJb3JpZ2luX2VjEFUaCWV1LXdlc3QtMSJGMEQCIFjWnnuJOmPHa77V%252FGSfEY4r3crxMJXv7d4KLb5BCsZhAiAUSNW2jSArwBjMJdLTn5ZKhaYCscTeFcgFIeSsaQXflCqcBAj%252B%252F%252F%252F%252F%252F%252F%252F%252F%252F%252F8BEAEaDDgxMzM4MjIzNjUzMSIMpBspMRgNt1U%252FH1a%252BKvAD%252BA8fZiE1bLIXlWJp9uQhdpOBDGIaj0GLA551i2Pjh4LCRJM7UDYhvYRqYtwEQTrKZZkiNx4MsMgGgmo8nnfMvb2RBlKKETwxsWxCFl3mPLPiuWRsANQtA%252B5GSpIemg4dRim0lJGrAAM%252B8G99eF2EcEXoR9M60H%252Foesers77VV88i2oF6wXCpXGvfBRUThOYXSlxKDodDX3B5q%252BhJthOfM3pcURq0aCLsvwmRI%252BeUSLn2oZus05AlQZPVMsGV%252B9yrgmBe3vLoo0euFeUJfXDrUyXd4TRJeyx0k5z4va8NljPEyDOM6yCcvCWJ%252BU0vjpDrR8CkxtRqPuKefmZPaujwXI0CHmmsGIqEoZ4XUu5oWsnY8rPPFrmT5e7fZ4niMpN0VMlvPxu0WqGeBgKXI7W4A9bYmQgktHI%252BR12laiJREt06U7yJnw1l%252FNC919UzADZT3n4S7bC3bXwhQ3l3QZPLbgzG%252BfvTL7jwsoW3qfN57ZnkWmGYtpMFoVz%252Be2atnUgkJeTdWQ5PIFcNGsO0UJIAw8c9mLi%252BGr62G1Z9%252FYGAtAZ2eJUo1N2nN3r2qJyz3p9haoVv3WX%252BkTIQu3WTok6tM1SPBGK8wbfwr6cgttDop8zCgOqu%252Ftf4kZoPi%252BdFIZkI4c4ebVU0TZccuPL%252BRk0rhDD%252BxZDBBjqnAbz%252BRetHg8fyC85v4775qJu8XKoo9AneQ2NY1WDICGp4BFY307OloTELbPa%252B5H%252BVwy0x1s3o%252F%252B5OijjRKSxdSqoQxHkH1if0YkFkp%252BEU42IttqCf5hG2Zp%252BzKZi6l3vbYtuRajFp4QJA4s6jivB5gbNh7AL3TNnRLj6PvkQx6UH4okUO3JPq6QIaIACQ3yBjyXFCX4z26v3v%252BqvKPax3X1pjXyT%252BYrNP%26Expires%3D1747289411&w=1920&q=75";

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
                : caculateAproxTimeFromTextCount(item.text) * 20}
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
