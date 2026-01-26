import React from "react";
import { Row, Col, Card, Statistic } from "antd";
import {
  FireOutlined,
  HeartOutlined,
  CalendarOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const BreedingOverviewCards = ({ data }) => {
  if (!data) return null; // 🛑 guard clause
  return (
    <Row gutter={16} style={{ marginBottom: 16 }}>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Ready for Breeding"
            value={data.ready_for_breeding || 0}
            prefix={<FireOutlined style={{ color: "#fa8c16" }} />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Pregnant Cows"
            value={data.pregnant || 0}
            prefix={<HeartOutlined style={{ color: "#eb2f96" }} />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Expected Calvings (30 days)"
            value={data.expected_calvings || 0}
            prefix={<CalendarOutlined style={{ color: "#52c41a" }} />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Overdue Pregnancy Checks"
            value={data.overdue_checks}
            valueStyle={{ color: "#cf1322" }}
            prefix={<WarningOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default BreedingOverviewCards;
