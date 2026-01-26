import React from "react";
import { Card, Statistic, Row, Col } from "antd";

const PregnancyStats = ({ stats }) => {
  return (
    <Card title="Pregnancy Overview">
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Total Pregnant" value={stats?.total || 0} />
        </Col>
        <Col span={12}>
          <Statistic title="Avg Days to Calving" value={stats?.avg_days || 0} />
        </Col>
        <Col span={12}>
          <Statistic title="1st Trimester" value={stats?.first_trimester || 0} />
        </Col>
        <Col span={12}>
          <Statistic title="3rd Trimester" value={stats?.third_trimester || 0} />
        </Col>
      </Row>
    </Card>
  );
};

export default PregnancyStats;
