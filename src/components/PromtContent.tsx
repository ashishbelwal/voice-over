import { Button, Form, Input, message, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useGenerateContent } from "../hooks/useGenerateContent";
import { CirclePlay, CircleStop } from "lucide-react";
import { TContent } from "../types/types";
const PromtContent = ({
  setContent,
  content,
}: {
  content: TContent[];
  setContent: (content: TContent[]) => void;
}) => {
  const [prompt, setPrompt] = useState<string>("");
  const { data, loading, error, generateContent } = useGenerateContent();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setContent([]);
    generateContent(prompt);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (data) {
      setContent(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      messageApi.error(error);
    }
  }, [error]);

  return (
    <>
      {contextHolder}
      <Modal
        title="Regenerate new script?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Confirm"
        cancelText="Cancel"
        cancelButtonProps={{
          style: {
            backgroundColor: "#fff",
            color: "#000",
            border: "none",
            boxShadow: "none",
          },
        }}
      >
        <p>
          Are you sure you want to regenerate a new script? This action will
          overwrite the current script and cannot be undone.
        </p>
      </Modal>
      <div className="full-height prompt-content-container">
        <Form name="text-prompt-generator" layout="vertical">
          <Form.Item name="prompt" style={{ marginBottom: 10 }}>
            <Input.TextArea
              rows={6}
              autoSize={{ minRows: 6, maxRows: 20 }}
              placeholder="Enter your prompt to generate content..."
              onChange={(e) => setPrompt(e.target.value)}
            />
          </Form.Item>
          <Form.Item label={null} style={{ textAlign: "right" }}>
            <Tooltip title={"Generate Script"}>
              <Button
                type="primary"
                shape="round"
                htmlType="submit"
                style={{
                  padding: 0,
                  width: 42,
                  height: 42,
                }}
                icon={loading ? <CircleStop /> : <CirclePlay />}
                onClick={() => {
                  if (prompt.length === 0) {
                    messageApi.error("Please enter a prompt");
                    return;
                  } else if (prompt.length > 0 && content.length > 0) {
                    showModal();
                  } else {
                    generateContent(prompt);
                  }
                }}
              />
            </Tooltip>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default PromtContent;
