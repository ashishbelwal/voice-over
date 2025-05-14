import {
  Avatar,
  Button,
  Dropdown,
  MenuProps,
  message,
  Space,
  Tooltip,
} from "antd";
import { Input } from "antd";
import {
  CircleMinus,
  CirclePlus,
  ArrowUpFromLine,
  ArrowDownFromLine,
} from "lucide-react";
import { useState, Dispatch, SetStateAction } from "react";
import { TContent, TContentType } from "../types/types";
const alexIcon = (
  <Avatar
    src="https://www.wondercraft.ai/_next/image?url=https%3A%2F%2Fwondercraft-app-thumbnails.s3.amazonaws.com%2Fvoice-images%2F15CVCzDByBinCIoCblXo.webp&w=750&q=75"
    size={26}
  />
);
const eveIcon = (
  <Avatar
    src="https://www.wondercraft.ai/_next/image?url=https%3A%2F%2Fwondercraft-app-thumbnails.s3.amazonaws.com%2Fvoice-images%2FkPzsL2i3teMYv0FxEYQ6.webp%3FAWSAccessKeyId%3DASIA32YK37FZ5GPBSIWX%26Signature%3DM0C1%252FegG%252F9%252F8%252BlaLKAqz1%252Bl85kw%253D%26x-amz-security-token%3DIQoJb3JpZ2luX2VjEFUaCWV1LXdlc3QtMSJGMEQCIFjWnnuJOmPHa77V%252FGSfEY4r3crxMJXv7d4KLb5BCsZhAiAUSNW2jSArwBjMJdLTn5ZKhaYCscTeFcgFIeSsaQXflCqcBAj%252B%252F%252F%252F%252F%252F%252F%252F%252F%252F%252F8BEAEaDDgxMzM4MjIzNjUzMSIMpBspMRgNt1U%252FH1a%252BKvAD%252BA8fZiE1bLIXlWJp9uQhdpOBDGIaj0GLA551i2Pjh4LCRJM7UDYhvYRqYtwEQTrKZZkiNx4MsMgGgmo8nnfMvb2RBlKKETwxsWxCFl3mPLPiuWRsANQtA%252B5GSpIemg4dRim0lJGrAAM%252B8G99eF2EcEXoR9M60H%252Foesers77VV88i2oF6wXCpXGvfBRUThOYXSlxKDodDX3B5q%252BhJthOfM3pcURq0aCLsvwmRI%252BeUSLn2oZus05AlQZPVMsGV%252B9yrgmBe3vLoo0euFeUJfXDrUyXd4TRJeyx0k5z4va8NljPEyDOM6yCcvCWJ%252BU0vjpDrR8CkxtRqPuKefmZPaujwXI0CHmmsGIqEoZ4XUu5oWsnY8rPPFrmT5e7fZ4niMpN0VMlvPxu0WqGeBgKXI7W4A9bYmQgktHI%252BR12laiJREt06U7yJnw1l%252FNC919UzADZT3n4S7bC3bXwhQ3l3QZPLbgzG%252BfvTL7jwsoW3qfN57ZnkWmGYtpMFoVz%252Be2atnUgkJeTdWQ5PIFcNGsO0UJIAw8c9mLi%252BGr62G1Z9%252FYGAtAZ2eJUo1N2nN3r2qJyz3p9haoVv3WX%252BkTIQu3WTok6tM1SPBGK8wbfwr6cgttDop8zCgOqu%252Ftf4kZoPi%252BdFIZkI4c4ebVU0TZccuPL%252BRk0rhDD%252BxZDBBjqnAbz%252BRetHg8fyC85v4775qJu8XKoo9AneQ2NY1WDICGp4BFY307OloTELbPa%252B5H%252BVwy0x1s3o%252F%252B5OijjRKSxdSqoQxHkH1if0YkFkp%252BEU42IttqCf5hG2Zp%252BzKZi6l3vbYtuRajFp4QJA4s6jivB5gbNh7AL3TNnRLj6PvkQx6UH4okUO3JPq6QIaIACQ3yBjyXFCX4z26v3v%252BqvKPax3X1pjXyT%252BYrNP%26Expires%3D1747289411&w=1920&q=75"
    size={26}
  />
);

const TranscriptContent = ({
  transcript,
  content,
  setContentType,
  setContent,
  handleAudioGeneration,
}: {
  transcript: TContent;
  content: TContent[];
  setContentType: Dispatch<SetStateAction<TContentType>>;
  setContent: Dispatch<SetStateAction<TContent[]>>;
  handleAudioGeneration: (voice: string, id: string) => void;
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [hovered, setHovered] = useState(false);
  const [transcriptValue, setTranscriptValue] = useState(transcript.text);
  const [voice, setVoice] = useState(
    transcript.voice ? transcript.voice : "Alex"
  );
  const items: MenuProps["items"] = [
    {
      label: "Alex",
      key: "1",
      icon: alexIcon,
      onClick: () => setVoice("Alex"),
    },
    {
      label: "Eve",
      key: "2",
      icon: eveIcon,
      onClick: () => setVoice("Eve"),
    },
  ];
  const menuProps = {
    items,
  };

  const addTranscript = (id: string) => {
    const newTranscript = {
      id: `${id}-${content.length + 1}`,
      text: "",
      waveform: "",
      audio: "",
      voice: "",
      audioBlob: null,
    };

    const index = content.findIndex((item) => item.id === id);
    const newContent = [...content];
    newContent.splice(index + 1, 0, newTranscript);
    setContent(newContent);
  };

  const deleteTranscript = (id: string) => {
    const index = content.findIndex((item) => item.id === id);
    const newContent = [...content];
    newContent.splice(index, 1);
    setContent(newContent);
  };
  const moveTranscript = (id: string, direction: "up" | "down") => {
    const index = content.findIndex((item) => item.id === id);
    const newContent = [...content];
    newContent.splice(
      index + (direction === "up" ? -1 : 1),
      0,
      newContent.splice(index, 1)[0]
    );
    setContent(newContent);
  };

  const copyTranscript = (id: string) => {
    const index = content.findIndex((item) => item.id === id);
    navigator.clipboard.writeText(content[index].text);
    messageApi.success("Copied to clipboard");
  };

  return (
    <>
      {contextHolder}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`${
          hovered ? "transcript-content-hovered" : ""
        } transcript-content`}
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <div className="flex justify-between">
          <Space style={{ marginBottom: 10 }}>
            <Button
              // size="small"
              className="grey-button"
              onClick={() => copyTranscript(transcript.id)}
            >
              Copy
            </Button>
            <Tooltip title="Change Voice" style={{ fontSize: 10 }}>
              <Dropdown menu={menuProps} trigger={["click"]}>
                <Button className="grey-button">
                  {voice === "Alex" ? alexIcon : eveIcon}
                  {voice}
                </Button>
              </Dropdown>
            </Tooltip>
            <Button
              className="grey-button"
              onClick={() => handleAudioGeneration(voice, transcript.id)}
            >
              Generate
            </Button>
          </Space>
          <Space>
            <Tooltip title="Move Up">
              <Button
                className="grey-button-icon"
                onClick={() => moveTranscript(transcript.id, "up")}
              >
                <ArrowUpFromLine size={12} strokeWidth={3} />
              </Button>
            </Tooltip>
            <Tooltip title="Move Down">
              <Button
                className="grey-button-icon"
                onClick={() => moveTranscript(transcript.id, "down")}
              >
                <ArrowDownFromLine size={12} strokeWidth={3} />
              </Button>
            </Tooltip>
          </Space>
        </div>
        <Input.TextArea
          placeholder="Enter your prompt to generate content..."
          style={{
            marginBottom: 10,
            border: "none",
            // backgroundColor: hovered ? "#00000005" : "transparent",
          }}
          value={transcriptValue}
          onChange={(e) => setTranscriptValue(e.target.value)}
          autoSize={{ minRows: 1, maxRows: 20 }}
        />
        {transcript.id && (
          <div
            className="flex justify-center items-center transcript-footer"
            style={{
              transition: "all 0.2s ease-in-out",
              opacity: hovered ? 1 : 0,
            }}
          >
            <Space style={{ marginBottom: 10 }}>
              <span className="line" />
              <Tooltip title="Add">
                <CirclePlus
                  style={{ marginRight: 4, cursor: "pointer" }}
                  size={20}
                  strokeWidth={1.5}
                  onClick={() => addTranscript(transcript.id)}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <CircleMinus
                  style={{ marginRight: 4, cursor: "pointer" }}
                  size={20}
                  strokeWidth={1.5}
                  onClick={() => deleteTranscript(transcript.id)}
                />
              </Tooltip>
              <span className="line" />
            </Space>
          </div>
        )}
      </div>
    </>
  );
};

export default TranscriptContent;
