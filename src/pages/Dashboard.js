import React, { Suspense, useContext, useMemo, useState } from "react";
import { Layout, Spin, Row, Col } from "antd";
import Sidebar from "../components/Layout/Sidebar";
import HeaderBar from "../components/Layout/Header";
import InventoryTable from "../components/Table/InventoryTable";
import useFetch from "../hooks/useFetch";
import { AuthContext } from "../context/AuthContext";

const { Content } = Layout;
const CostChart = React.lazy(() => import("../components/Charts/CostChart"));

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const { data: inventory, loading: invLoading, error: invErr } = useFetch("/mock-data/inventory.json");
  const { data: costs, loading: costLoading, error: costErr } = useFetch("/mock-data/costs.json");
  const [service, setService] = useState();

  const error = invErr || costErr;
  const loading = invLoading || costLoading;

  const containerStyle = { padding: 16, minHeight: "100vh" };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <HeaderBar />
        <Content style={containerStyle}>
          {error && <div>Failed to load data: {error.message}</div>}
          {loading && <div style={{ display: "grid", placeItems: "center", height: 200 }}><Spin /></div>}
          {!loading && !error && (
            <>
              <Row gutter={[16,16]}>
                <Col span={24}>
                  <InventoryTable data={inventory} />
                </Col>
                <Col span={24}>
                  <Suspense fallback={<div style={{ display: "grid", placeItems: "center", height: 320 }}><Spin /></div>}>
                    <CostChart data={costs} service={service} onServiceChange={setService} />
                  </Suspense>
                </Col>
              </Row>
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
