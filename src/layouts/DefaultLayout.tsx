import { Outlet } from "react-router-dom";

import { Layout } from "antd";
import { Header } from "@/layouts/partials";
import { Sidebar } from "@/layouts/partials/Sidebar";

const { Content } = Layout;

export const DefaultLayout = () => {
  return (
    <Layout className="w-full max-w-screen ">
      <Header />
      <Sidebar>
        <Content className="text-center  text-black ">
          <Outlet />
        </Content>
      </Sidebar>
    </Layout>
  );
};
