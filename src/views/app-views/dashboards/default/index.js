import React, { useState } from "react";
import { Row, Col, Button, Avatar, Dropdown, Table, Menu, Tag } from 'antd';
import StatisticWidget from 'components/shared-components/StatisticWidget';
import ChartWidget from 'components/shared-components/ChartWidget';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import GoalWidget from 'components/shared-components/GoalWidget';
import Card from 'components/shared-components/Card';
import Flex from 'components/shared-components/Flex';

import API from "services/Api";
import dayjs from "dayjs";

import ApexChart from 'react-apexcharts';
import { apexLineChartDefaultOption, COLOR_2 } from 'constants/ChartConstant';
import { SPACER } from 'constants/ThemeConstant'
import {
  FileExcelOutlined,
  PrinterOutlined,
  PlusOutlined,
  EllipsisOutlined,
  StopOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import utils from 'utils';
import { useSelector } from 'react-redux';

const MembersChart = props => (
  <ApexChart {...props} />
)

const memberChartOption = {
  ...apexLineChartDefaultOption,
  ...{
    chart: {
      sparkline: {
        enabled: true,
      }
    },
    colors: [COLOR_2],
  }
}

const latestTransactionOption = [
  {
    key: 'Refresh',
    label: (
      <Flex alignItems="center" gap={SPACER[2]}>
        <ReloadOutlined />
        <span className="ml-2">Refresh</span>
      </Flex>
    ),
  },
  {
    key: 'Print',
    label: (
      <Flex alignItems="center" gap={SPACER[2]}>
        <PrinterOutlined />
        <span className="ml-2">Print</span>
      </Flex>
    ),
  },
  {
    key: 'Export',
    label: (
      <Flex alignItems="center" gap={SPACER[2]}>
        <FileExcelOutlined />
        <span className="ml-2">Export</span>
      </Flex>
    ),
  },
]

const newJoinMemberOptions = [
  {
    key: 'Add all',
    label: (
      <Flex alignItems="center" gap={SPACER[2]}>
        <PlusOutlined />
        <span className="ml-2">Add all</span>
      </Flex>
    ),
  },
  {
    key: 'Disable all',
    label: (
      <Flex alignItems="center" gap={SPACER[2]}>
        <StopOutlined />
        <span className="ml-2">Disable all</span>
      </Flex>
    ),
  },
]

const CardDropdown = ({ items }) => {

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
      <a href="/#" className="text-gray font-size-lg" onClick={e => e.preventDefault()}>
        <EllipsisOutlined />
      </a>
    </Dropdown>
  )
}


const tableColumns = [
  {
    title: 'Cow',
    dataIndex: 'cow_display',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    render: d => dayjs(d).format("DD MMM YYYY"),
  },
  {
    title: 'Session',
    dataIndex: 'session',
    render: s => (
      <Tag color={s === 'morning' ? 'gold' : 'blue'}>
        {s.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: 'Litres',
    dataIndex: 'quantity_in_liters',
    render: q => <strong>{q} L</strong>,
  },
];


export const DefaultDashboard = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const { direction } = useSelector(state => state.theme)

  React.useEffect(() => {
    const fetchMilkRecords = async () => {
      try {
        setLoading(true);
        const res = await API("production/milk-records/", "GET");
        setRecords(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMilkRecords();
  }, []);


  const today = dayjs().format("YYYY-MM-DD");

  const todayRecords = records.filter(r => r.date === today);

  const totalToday = todayRecords.reduce(
    (sum, r) => sum + Number(r.quantity_in_liters),
    0
  );

  const dailyMap = {};
  records.forEach(r => {
    const d = dayjs(r.date).format("DD MMM");
    dailyMap[d] = (dailyMap[d] || 0) + Number(r.quantity_in_liters);
  });

  const chartSeries = [{
    name: "Milk (Litres)",
    data: Object.values(dailyMap),
  }];

  const chartCategories = Object.keys(dailyMap);

  // const today = dayjs().format("YYYY-MM-DD");

  // const todayRecords = records.filter(r => r.date === today);

  // const totalToday = todayRecords.reduce(
  //   (sum, r) => sum + Number(r.quantity_in_liters),
  //   0
  // );

  const activeCows = new Set(records.map(r => r.cow)).size;

  const avgPerCow = activeCows
    ? (totalToday / activeCows).toFixed(1)
    : 0;
  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={18}>
          <Row gutter={16}>
            {
              [
                {
                  title: "Milk Collected Today",
                  value: `${totalToday.toFixed(2)} L`,
                  subtitle: "Based on today's production",
                },
                {
                  title: "Active Cows",
                  value: String(activeCows), // ✅ FIX
                  subtitle: "Cows with milk records",
                },
                {
                  title: "Average per Cow",
                  value: `${avgPerCow} L`,
                  subtitle: "Today's average output",
                },
              ].map((elm, i) => (
                <Col xs={24} sm={24} md={24} lg={24} xl={8} key={i}>
                  <StatisticWidget
                    title={elm.title}
                    value={elm.value}
                    subtitle={elm.subtitle}
                  />
                </Col>
              ))
            }



          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <ChartWidget
                title="Daily Milk Collection (Litres)"
                series={chartSeries}
                xAxis={chartCategories}

                height="400px"
                direction={direction}
              />

            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={24} lg={6}>
          <GoalWidget
            title="Monthly Target"
            value={87}
            subtitle="You need abit more effort to hit monthly target"
            extra={<Button type="primary">Learn More</Button>}
          />
          {/* <StatisticWidget
            title={
              <MembersChart
                options={memberChartOption}
                series={activeMembersData}
                height={145}
              />
            }
            value='17,329'
            status={3.7}
            subtitle="Active members"
          /> */}
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={7}>
          <Card title="New Join Member" extra={<CardDropdown items={newJoinMemberOptions} />}>
            <div className="mt-3">
              {

              }
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={17}>
          <Card title="Latest Transactions" extra={<CardDropdown items={latestTransactionOption} />}>
            <Table
              className="no-border-last"
              columns={tableColumns}
              dataSource={records.slice(0, 5)}
              loading={loading}

              rowKey='id'
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}


export default DefaultDashboard;
