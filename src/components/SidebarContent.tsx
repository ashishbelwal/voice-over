import { MessageSquareText, AudioLines } from "lucide-react";
import { Layout, Menu, MenuProps } from "antd";
import { theme } from "antd";
import { Dispatch, SetStateAction } from "react";
import { TContentType } from "../types/types";
const { Sider } = Layout;

interface SidebarContentProps {
  contentType: TContentType;
  setContentType: Dispatch<SetStateAction<TContentType>>;
}

const SidebarContent = ({
  contentType,
  setContentType,
}: SidebarContentProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const items: MenuProps["items"] = [
    {
      key: "content",
      label: "content",
      icon: <MessageSquareText />,
      onClick: () => setContentType("content"),
    },
    {
      key: "audio",
      label: "Audio",
      icon: <AudioLines />,
      onClick: () => setContentType("audio"),
    },
  ];
  return (
    <Sider
      style={{ background: colorBgContainer, height: "calc(100vh - 120px)" }}
      width={200}
    >
      <Menu
        mode="inline"
        style={{ height: "100%", padding: "10px" }}
        defaultSelectedKeys={[contentType]}
        items={items}
      />
    </Sider>
  );
};

export default SidebarContent;
