import React from "react";
import { Row, Col, Button, Card } from "antd";
import Flex from "components/shared-components/Flex";
import { PlusOutlined, BarChartOutlined } from "@ant-design/icons";
import ChartWidget from "components/shared-components/ChartWidget";
import { COLORS } from "constants/ChartConstant";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import useMilkRecords from "hooks/useMilkRecords";

const MilkProductionSummary = ({date}) => {
  const navigate = useNavigate();
  const { direction } = useSelector(state => state.theme);
  const { total, weeklySeries } = useMilkRecords(date);

  return (
    <Card>
      <Row gutter={16}>
        <Col xs={24} lg={8}>
          <Flex className="h-100" flexDirection="column" justifyContent="space-between">
            <div>
              <h4 className="mb-0">Milk Production</h4>
              <span className="text-muted">Today</span>
            </div>

            <div className="mb-4">
              <h1 className="font-weight-bold">{total.toFixed(2)} L</h1>
              <p className="text-success">
                <BarChartOutlined /> Based on real production data
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
          <ChartWidget
            card={false}
            series={weeklySeries}
            xAxis={["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}
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
