import { useBoolean } from "@/hooks/useBoolean";
import { useWindowSize } from "@/hooks/useWindowSize";
import { icons, PATH } from "@/utils";
import { Button, ConfigProvider, Menu, MenuProps } from "antd";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

type Props = {
  children: React.ReactNode;
};

export const Sidebar: React.FC<Props> = ({ children }) => {
  const sidebarController = useBoolean(false);
  const windowSize = useWindowSize();
  const location = useLocation().pathname || "";
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      key: PATH.dashboard,
      icon: icons.dashboard,
      label: "Dashboard",
      onClick: () => navigate(PATH.dashboard),
    },
    {
      key: PATH.search,
      icon: icons.search,
      label: "Search Scores",
      onClick: () => navigate(PATH.search),
    },
    {
      key: PATH.reports,
      icon: icons.reports,
      label: "Report",
      onClick: () => navigate(PATH.reports),
    },
    {
      key: PATH.settings,
      icon: icons.settings,
      label: "Settings",
      disabled: true,
      onClick: () => navigate(PATH.settings),
    },
  ];
  return (
    <div className={`flex min-h-[90vh] w-screen ${windowSize.width < 768 && "flex-col"}`}>
      <div className="p-2 sm:p-4 resize-x lg:max-w-[25vw] border-r-4 border-gray-300">
        {windowSize.width > 768 && (
          <Button className="w-full mb-2" size="large" type="primary" onClick={sidebarController.toggle}>
            {sidebarController.value ? <BiArrowFromLeft className="" /> : <BiArrowFromRight className="" />}
          </Button>
        )}
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                iconSize: 24,
                itemHeight: 60,
                itemSelectedColor: "#fcfcfc",
                itemSelectedBg: "#193cb8",
                itemPaddingInline: windowSize.width < 768 ? 4 : 56,
              },
            },
          }}
        >
          <Menu
            mode={windowSize.width < 768 ? "horizontal" : "inline"}
            inlineCollapsed={sidebarController.value}
            items={items}
            style={{
              backgroundColor: "#f1f5f9",
              fontSize: windowSize.width > 768 ? "1.5rem" : "1rem",
              border: "none",
            }}
            selectedKeys={[location]}
          />
        </ConfigProvider>
      </div>
      <div className="flex-1 bg-slate-300 overflow-auto">{children}</div>
    </div>
  );
};
