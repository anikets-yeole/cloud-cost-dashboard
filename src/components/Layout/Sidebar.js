import React from "react";
import { Layout, Menu } from "antd";
import { PieChartOutlined, SettingOutlined, TableOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

export default function Sidebar() {
  const location = useLocation();
  const selected = location.pathname === "/" ? ["/"] : [location.pathname];
  const items = [
    { key: "/", icon: <TableOutlined />, label: <Link to="/">Dashboard</Link> },
    { key: "/settings", icon: <SettingOutlined />, label: <Link to="/settings">Settings</Link> },
  ];
  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div style={{ color: "white", padding: 16, fontWeight: 700 }}>Cloud Cost</div>
      <Menu theme="dark" mode="inline" selectedKeys={selected} items={items} />
    </Sider>
  );
}
