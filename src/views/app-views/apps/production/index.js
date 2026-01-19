import React from "react";
import { Row, Col, Button, Card, Table, Tag, Select, Badge } from 'antd';
import MilkProductionSummary from "views/app-views/apps/production/milkproduction";
import MilkStats from "views/app-views/apps/production/milkstats";
import dayjs from 'dayjs';
import { DATE_FORMAT_DD_MM_YYYY } from 'constants/DateConstant'
import utils from 'utils'
import Flex from 'components/shared-components/Flex'
import AvatarStatus from 'components/shared-components/AvatarStatus';
import useMilkRecords from "hooks/useMilkRecords";

const getPaymentStatus = status => {
  if (status === 'Paid') {
    return 'success'
  }
  if (status === 'Pending') {
    return 'warning'
  }
  if (status === 'Expired') {
    return 'error'
  }
  return ''
}

const getShippingStatus = status => {
  if (status === 'Ready') {
    return 'blue'
  }
  if (status === 'Shipped') {
    return 'cyan'
  }
  return ''
}

const RecentMilkRecords = () => {
  const { records } = useMilkRecords();

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
    <Card title="Recent Milk Records">
      <Table
        rowKey="id"
        pagination={false}
        columns={columns}
        dataSource={records.slice(0, 10)}
      />
    </Card>
  );
};

const MilkDashboard = () => {
  return (
    <>
      <Row gutter={16}>
        <Col xs={24} lg={16}>
          <MilkProductionSummary />
        </Col>
        <Col xs={24} lg={8}>
          <MilkStats />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <RecentMilkRecords />
        </Col>
      </Row>

    </>

  );
};

export default MilkDashboard;
