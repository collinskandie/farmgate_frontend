import React, { useState } from "react";
import { Row, Col, Card, DatePicker } from "antd";
import dayjs from "dayjs";
import MilkProductionSummary from "views/app-views/apps/production/milkproduction";
import MilkStats from "views/app-views/apps/production/milkstats";
import useMilkRecords from "hooks/useMilkRecords";
import RecentMilkRecords from "./RecentMilkRecords";

const MilkDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <>
      <Card style={{ marginBottom: 16 }}>
        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
          allowClear={false}
        />
      </Card>

      <Row gutter={16}>
        <Col xs={24} lg={16}>
          <MilkProductionSummary date={selectedDate} />
        </Col>
        <Col xs={24} lg={8}>
          <MilkStats date={selectedDate} />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <RecentMilkRecords date={selectedDate} />
        </Col>
      </Row>
    </>
  );
};

export default MilkDashboard;
