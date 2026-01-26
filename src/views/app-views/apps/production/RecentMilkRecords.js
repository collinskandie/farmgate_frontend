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


// const RecentMilkRecords = () => {
//   const { records } = useMilkRecords();



//   return (
//     <Card title="Recent Milk Records">
//       <Table
//         rowKey="id"
//         pagination={false}
//         columns={columns}
//         dataSource={records.slice(0, 10)}
//       />
//     </Card>
//   );
// };
export default RecentMilkRecords;
