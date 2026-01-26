import React from "react";
import {  Card, Table, Tag } from 'antd';

import dayjs from 'dayjs';

import useMilkRecords from "hooks/useMilkRecords";

const RecentMilkRecords = ({ date }) => {
  const { records, loading } = useMilkRecords(date);
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: d => dayjs(d).format("DD MMM YYYY"),
    },
    {
      title: "Cow",
      dataIndex: "cow_display",
    },

    {
      title: "Session",
      dataIndex: "session",
      render: s => <Tag color={s === "morning" ? "gold" : "blue"}>{s}</Tag>,
    },
    {
      title: "Litres",
      dataIndex: "quantity_in_liters",
      render: q => <strong>{q} L</strong>,
    },
  ];

  return (
    <Card title="Milk Records">
      <Table
        rowKey="id"
        loading={loading}
        pagination={false}
        columns={columns}
        dataSource={records.slice(0, 10)}
      />
    </Card>
  );
};

export default RecentMilkRecords;
