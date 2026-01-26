import React from "react";
import { Card, Table, Tag } from "antd";

const BreedingActivitySummary = ({ records }) => {
  const columns = [
    {
      title: "Cow",
      dataIndex: "tag",
    },
    {
      title: "Date Bred",
      dataIndex: "date",
    },
    {
      title: "Method",
      dataIndex: "method",
      render: m => (
        <Tag color={m === "AI" ? "blue" : "green"}>{m}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: s => (
        <Tag color={s === "Confirmed" ? "green" : "orange"}>{s}</Tag>
      ),
    },
  ];

  return (
    <Card title="Breeding Activity">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={records}
        pagination={false}
      />
    </Card>
  );
};

export default BreedingActivitySummary;
