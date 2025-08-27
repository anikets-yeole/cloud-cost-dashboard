import React, { useContext } from "react";
import { Layout, Switch, Dropdown, Space } from "antd";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";

const { Header: AntHeader } = Layout;

export default function HeaderBar() {
  const { mode, toggle } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const menuItems = [
    { key: "name", label: <span>{user?.name || "User"}</span> },
    { type: "divider" },
    { key: "logout", label: <span onClick={logout}>Logout</span> }
  ];

  return (
    <AntHeader style={{ background: "transparent", padding: "0 16px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <bold>Cloud Cost & Inventory Dashboard</bold>
        <Space>
          <span>Dark</span>
          <Switch checked={mode === "dark"} onChange={toggle} />
          <Dropdown menu={{ items: menuItems }} placement="bottomRight">
            <span style={{ cursor: "pointer" }}>{user?.name || "User"}</span>
          </Dropdown>
        </Space>
      </div>
    </AntHeader>
  );
}
