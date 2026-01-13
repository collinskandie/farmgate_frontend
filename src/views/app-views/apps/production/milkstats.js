import React from "react";
import { Row, Col } from "antd";
import DataDisplayWidget from "components/shared-components/DataDisplayWidget";
import {
  ExperimentOutlined,
  TeamOutlined,
  CalendarOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

const MilkStats = () => (
  <Row gutter={16}>
    <Col span={12}>
      <DataDisplayWidget
        icon={<ExperimentOutlined />}
        value="320 L"
        title="Today’s Milk"
        color="blue"
        vertical
      />
    </Col>
    <Col span={12}>
      <DataDisplayWidget
        icon={<CalendarOutlined />}
        value="1,090 L"
        title="This Week"
        color="cyan"
        vertical
      />
    </Col>
    <Col span={12}>
      <DataDisplayWidget
        icon={<TeamOutlined />}
        value="24"
        title="Milking Cows"
        color="green"
        vertical
      />
    </Col>
    <Col span={12}>
      <DataDisplayWidget
        icon={<ThunderboltOutlined />}
        value="13.3 L"
        title="Avg / Cow"
        color="volcano"
        vertical
      />
    </Col>
  </Row>
);

export default MilkStats;
