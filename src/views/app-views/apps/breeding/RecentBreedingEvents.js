import React from "react";
import { Card, Table } from "antd";

const RecentBreedingEvents = ({ events }) => {
  
  const columns = [
    { title: "Cow", dataIndex: "tag" },
    { title: "Date", dataIndex: "date" },
    { title: "Method", dataIndex: "method" },
    { title: "Result", dataIndex: "result" },
  ];

  return (
    <Card title="Recent Breeding Events">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={events}
        pagination={false}
      />
    </Card>
  );
};

export default RecentBreedingEvents;
