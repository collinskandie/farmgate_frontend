import React from "react";
import { Row, Col, Button, Card } from "antd";
import Flex from "components/shared-components/Flex";
import {
  PlusOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import ChartWidget from "components/shared-components/ChartWidget";
import { COLORS } from "constants/ChartConstant";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {APP_PREFIX_PATH} from "configs/AppConfig";

const milkProductionData = {
  series: [
    {
      name: "Milk (Litres)",
      data: [120, 135, 128, 142, 150, 160, 155],
    },
  ],
  categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};

const MilkProductionSummary = () => {
  const navigate = useNavigate();
  const { direction } = useSelector((state) => state.theme);

  return (
    <Card>
      <Row gutter={16}>
        <Col xs={24} lg={8}>
          <Flex className="h-100" flexDirection="column" justifyContent="space-between">
            <div>
              <h4 className="mb-0">Milk Production</h4>
              <span className="text-muted">This week</span>
            </div>

            <div className="mb-4">
              <h1 className="font-weight-bold">1,090 L</h1>
              <p className="text-success">
                <BarChartOutlined /> Steady increase this week
              </p>
              <p>Total milk collected from all cows.</p>
            </div>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate(`${APP_PREFIX_PATH}/apps/production/record`)}
            >
              Add Milk Record
            </Button>
          </Flex>
        </Col>

        <Col xs={24} lg={16}>
          <div className="mb-3 text-right">
            <Button onClick={() => navigate("/app/milk-records")}>
              View All Records
            </Button>
          </div>

          <ChartWidget
            card={false}
            series={milkProductionData.series}
            xAxis={milkProductionData.categories}
            title="Daily Milk Production (Litres)"
            height={250}
            type="bar"
            customOptions={{ colors: COLORS }}
            direction={direction}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default MilkProductionSummary;
