import { Layout } from "antd";
import Sidebar from "components/Navigatons/Sidebar";
import { ReactElement } from "react";
import Navbar from "../components/Navigatons/Header";
import "./layout.sass";

const LayoutBase = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}): ReactElement => {
  const { Header, Sider, Content } = Layout;

  return (
    <Layout className="layout">
      <Sider>
        <Sidebar />
      </Sider>
      <Layout>
        <Header>
          <Navbar />
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default LayoutBase;
