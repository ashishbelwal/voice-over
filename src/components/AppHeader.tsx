import { Button, Dropdown, Image, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";

const AppHeader = () => {
  const items: MenuProps["items"] = [
    {
      label: "Portfolio",
      key: "1",
      onClick: () => {
        window.open("https://nebuchadnezzar.in/", "_blank");
      },
    },
    {
      label: "LinkedIn",
      key: "2",
      onClick: () => {
        window.open(
          "https://www.linkedin.com/in/ashish-belwal-3a59576b/",
          "_blank"
        );
      },
    },
    {
      label: "CV",
      key: "4",
      onClick: () => {
        window.open(
          "https://nebuchadnezzar.in/img/Ashish-Belwal-Resume-2024.pdf",
          "_blank"
        );
      },
    },
  ];
  const menuProps = {
    items,
  };

  return (
    <>
      <Header>
        <div className="flex justify-between items-center">
          <div className="logo">
            <Image width={30} src="/logo.png" preview={false} />
            <h1>Voice Over</h1>
          </div>
          <Dropdown menu={menuProps}>
            <Button type="primary"> About me </Button>
          </Dropdown>
        </div>
      </Header>
    </>
  );
};

export default AppHeader;
