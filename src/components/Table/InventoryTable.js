import React, { useMemo, useReducer } from "react";
import { Table, Input, Tag, Space, Button, Dropdown } from "antd";
import { dashboardReducer, initialState } from "../../reducers/dashboardReducer";
import useDebounce from "../../hooks/useDebounce";

export default function InventoryTable({ data }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  const debounced = useDebounce(state.search, 300);

  const services = Array.from(new Set((data || []).map(d => d.service))).sort();
  const regions = Array.from(new Set((data || []).map(d => d.region))).sort();
  const statuses = Array.from(new Set((data || []).map(d => d.status))).sort();

  const filtered = useMemo(() => {
    return (data || []).filter(item => {
      const matchesSearch = debounced
        ? (item.name?.toLowerCase().includes(debounced.toLowerCase()) ||
           item.service?.toLowerCase().includes(debounced.toLowerCase()) ||
           item.region?.toLowerCase().includes(debounced.toLowerCase()))
        : true;
      const matchesService = state.services.size ? state.services.has(item.service) : true;
      const matchesRegion = state.regions.size ? state.regions.has(item.region) : true;
      const matchesStatus = state.status.size ? state.status.has(item.status) : true;
      return matchesSearch && matchesService && matchesRegion && matchesStatus;
    });
  }, [data, debounced, state.services, state.regions, state.status]);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name", sorter: (a,b) => (a.name||'').localeCompare(b.name||'') },
    { title: "Service", dataIndex: "service", key: "service",
      filters: services.map(s => ({ text: s, value: s })),
      onFilter: (val, record) => record.service === val
    },
    { title: "Region", dataIndex: "region", key: "region",
      filters: regions.map(r => ({ text: r, value: r })),
      onFilter: (val, record) => record.region === val
    },
    { title: "Status", dataIndex: "status", key: "status",
      render: (st) => <Tag color={st === "running" || st === "active" ? "green" : "orange"}>{st}</Tag>,
      filters: statuses.map(s => ({ text: s, value: s })),
      onFilter: (val, record) => record.status === val
    },
    { title: "Tags", dataIndex: "tags", key: "tags",
      render: (tags) => <Space>{Object.entries(tags || {}).map(([k,v]) => <Tag key={k}>{k}:{v}</Tag>)}</Space> }
  ];

  const filterMenu = (label, setKey, list) => ({
    items: list.map(v => ({
      key: v,
      label: <span onClick={() => dispatch({ type: setKey, payload: v })}>
        <input type="checkbox" readOnly checked={
          setKey === "TOGGLE_SERVICE" ? state.services.has(v) :
          setKey === "TOGGLE_REGION" ? state.regions.has(v) :
          state.status.has(v)
        }/> {v}
      </span>
    })).concat([{ type: "divider" }, { key: "reset", label: <span onClick={() => dispatch({ type: "RESET_FILTERS" })}>Reset</span> }])
  });

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12, justifyContent: "space-between" }}>
        <Input.Search
          placeholder="Search name/service/region"
          allowClear
          style={{ maxWidth: 400 }}
          value={state.search}
          onChange={(e) => dispatch({ type: "SET_SEARCH", payload: e.target.value })}
        />
        <Space>
          <Dropdown menu={filterMenu("Service", "TOGGLE_SERVICE", services)} trigger={["click"]}>
            <Button>Filter Service</Button>
          </Dropdown>
          <Dropdown menu={filterMenu("Region", "TOGGLE_REGION", regions)} trigger={["click"]}>
            <Button>Filter Region</Button>
          </Dropdown>
          <Dropdown menu={filterMenu("Status", "TOGGLE_STATUS", statuses)} trigger={["click"]}>
            <Button>Filter Status</Button>
          </Dropdown>
        </Space>
      </div>
      <Table
        rowKey="id"
        dataSource={filtered}
        columns={columns}
        pagination={{ pageSize: 5, showSizeChanger: true }}
        scroll={{ x: true }}
      />
    </div>
  );
}
