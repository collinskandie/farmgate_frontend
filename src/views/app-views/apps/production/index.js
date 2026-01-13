import React from "react";
import { Row, Col, Button, Card, Table, Tag, Select, Badge } from 'antd';
import MilkProductionSummary from "views/app-views/apps/production/milkproduction";
import MilkStats from "views/app-views/apps/production/milkstats";
import {
  recentOrderData
} from './SalesDashboardData'
import dayjs from 'dayjs';
import { DATE_FORMAT_DD_MM_YYYY } from 'constants/DateConstant'
import utils from 'utils'
import Flex from 'components/shared-components/Flex'
import AvatarStatus from 'components/shared-components/AvatarStatus';

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
const tableColumns = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: 'Cows Name',
    dataIndex: 'name',
    render: (_, record) => (
      <Flex>
        <AvatarStatus size={30} src={record.image} name={record.name} />
      </Flex>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
  },
  {
    title: 'Date',
    dataIndex: 'date',
    render: (_, record) => (
      <span>{dayjs.unix(record.date).format(DATE_FORMAT_DD_MM_YYYY)}</span>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, 'date')
  },
  {
    title: 'Time',
    dataIndex: 'orderStatus',
    render: (_, record) => (
      <><Tag color={getShippingStatus(record.orderStatus)}>{record.orderStatus}</Tag></>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, 'orderStatus')
  },
  {
    title: 'Litres Collected',
    dataIndex: 'paymentStatus',
    render: (_, record) => (
      <>
        <Badge status={getPaymentStatus(record.paymentStatus)} />
        <span className="mx-2">{record.paymentStatus}</span>
      </>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, 'paymentStatus')
  },

]
const RecentOrder = () => (
  <Card title="Recent Order">
    <Table
      pagination={false}
      columns={tableColumns}
      dataSource={recentOrderData}
      rowKey='id'
    />
  </Card>
)

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
        <RecentOrder />
      </Row>

    </>

  );
};

export default MilkDashboard;
