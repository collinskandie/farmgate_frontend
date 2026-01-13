import React from "react";
import { Row, Col } from "antd";
import DataDisplayWidget from "components/shared-components/DataDisplayWidget";
import {
  ExperimentOutlined,
  TeamOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import useMilkRecords from "hooks/useMilkRecords";

const MilkStats = () => {
  const {
    totalToday,
    milkingCows,
    avgPerCow,
  } = useMilkRecords();

  return (
    <Row gutter={16}>
      <Col span={12}>
        <DataDisplayWidget
          icon={<ExperimentOutlined />}
          value={`${totalToday.toFixed(2)} L`}
          title="Today’s Milk"
          color="blue"
          vertical
        />
      </Col>

      <Col span={12}>
        <DataDisplayWidget
          icon={<TeamOutlined />}
          value={milkingCows}
          title="Milking Cows"
          color="green"
          vertical
        />
      </Col>

      <Col span={12}>
        <DataDisplayWidget
          icon={<ThunderboltOutlined />}
          value={`${avgPerCow} L`}
          title="Avg / Cow"
          color="volcano"
          vertical
        />
      </Col>
    </Row>
  );
};

export default MilkStats;
