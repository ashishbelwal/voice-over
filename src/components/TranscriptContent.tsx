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

const TranscriptContent = ({
  transcript,
  content,
  setContentType,
  setContent,
}: {
  transcript: TContent;
  content: TContent[];
  setContentType: Dispatch<SetStateAction<TContentType>>;
  setContent: Dispatch<SetStateAction<TContent[]>>;
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [hovered, setHovered] = useState(false);
  const [transcriptValue, setTranscriptValue] = useState(transcript.text);
  const items: MenuProps["items"] = [
    {
      label: "Alex",
      key: "1",
      icon: (
        <Avatar
          src="https://www.wondercraft.ai/_next/image?url=https%3A%2F%2Fwondercraft-app-thumbnails.s3.amazonaws.com%2Fvoice-images%2F15CVCzDByBinCIoCblXo.webp&w=750&q=75"
          size={26}
        />
      ),
    },
    {
      label: "Eve",
      key: "2",
      icon: (
        <Avatar
          src="https://www.wondercraft.ai/_next/image?url=https%3A%2F%2Fwondercraft-app-thumbnails.s3.amazonaws.com%2Fvoice-images%2F15CVCzDByBinCIoCblXo.webp&w=750&q=75"
          size={26}
        />
      ),
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
                  <Avatar
                    src="https://www.wondercraft.ai/_next/image?url=https%3A%2F%2Fwondercraft-app-thumbnails.s3.amazonaws.com%2Fvoice-images%2F15CVCzDByBinCIoCblXo.webp&w=750&q=75"
                    size={26}
                  />
                  Alex
                </Button>
              </Dropdown>
            </Tooltip>
            <Button className="grey-button">Generate</Button>
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
