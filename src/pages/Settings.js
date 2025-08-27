import React, { useContext } from "react";
import { Layout, Card, Switch, Typography } from "antd";
import Sidebar from "../components/Layout/Sidebar";
import HeaderBar from "../components/Layout/Header";
import { ThemeContext } from "../context/ThemeContext";

const { Content } = Layout;

export default function Settings() {
  const { mode, toggle } = useContext(ThemeContext);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <HeaderBar />
        <Content style={{ padding: 16 }}>
          <Card title="Appearance" style={{ maxWidth: 600 }}>
            <Typography.Paragraph>
              Toggle between light and dark mode.
            </Typography.Paragraph>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span>Dark Mode</span>
              <Switch checked={mode === "dark"} onChange={toggle} />
            </div>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}
