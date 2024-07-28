"use client";
import { Layout, theme, Typography } from "antd";
import SideBar from "../SideBar";
import { useState } from "react";

export default function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { Header, Content, Sider } = Layout;
  const { Title } = Typography;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <section>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          style={{ background: colorBgContainer }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
        >
          <SideBar id={params.id} />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              marginLeft: "10px",
              marginTop: "3px",
            }}
          >
            <Title className="flex justify-center items-center">
              Teaching Service Invoice System
            </Title>
          </Header>
          <Content
            style={{
              margin: "10px",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className="p-6">{children}</div>
          </Content>
        </Layout>
      </Layout>
    </section>
  );
}
