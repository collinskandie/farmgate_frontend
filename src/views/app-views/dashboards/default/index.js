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
import { useSelector } from 'react-redux';

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
const DiffBadge = ({ diff }) => {
  if (diff === null || diff === undefined) return null;

  if (diff > 0) {
    return (
      <span style={{ color: "#3f8600", marginLeft: 6 }}>
        ▲ +{diff.toFixed(1)}
      </span>
    );
  }

  if (diff < 0) {
    return (
      <span style={{ color: "#cf1322", marginLeft: 6 }}>
        ▼ {diff.toFixed(1)}
      </span>
    );
  }

  return (
    <span style={{ color: "#8c8c8c", marginLeft: 6 }}>
      ▬ 0.0
    </span>
  );
};


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
  const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");

  const todayRecords = records.filter(r => r.date === today);

  const totalToday = Number(
    todayRecords.reduce(
      (sum, r) => sum + Number(r.quantity_in_liters),
      0
    ).toFixed(2)
  );
  const sortedRecords = [...records].sort(
    (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
  );

  const dailyMap = {};
  sortedRecords.forEach(r => {
    const d = dayjs(r.date).format("DD MMM");
    dailyMap[d] = Number(
      ((dailyMap[d] || 0) + Number(r.quantity_in_liters)).toFixed(2)
    );

  });

  const chartCategories = Object.keys(dailyMap);
  const chartSeries = [
    {
      name: "Milk (Litres)",
      data: Object.values(dailyMap),
    },
  ];


  // const chartCategories = Object.keys(dailyMap);
  const activeCows = new Set(records.map(r => r.cow)).size;
  const avgPerCow = activeCows
    ? (totalToday / activeCows).toFixed(1)
    : 0;
  const aggregateByCow = (date) =>
    records
      .filter((r) => r.date === date)
      .reduce((acc, r) => {
        const cow = r.cow;
        if (!acc[cow]) {
          acc[cow] = {
            cow,
            cow_display: r.cow_display,
            morning: 0,
            afternoon: 0,
            evening: 0,
            total: 0,
          };
        }

        acc[cow][r.session] += Number(r.quantity_in_liters);
        acc[cow].total += Number(r.quantity_in_liters);
        return acc;
      }, {});

  const todayMap = aggregateByCow(today);
  const yesterdayMap = aggregateByCow(yesterday);

  const comparisonData = Object.values(todayMap).map((t) => {
    const y = yesterdayMap[t.cow] || {};
    const diff = (a, b) => (b !== undefined ? a - b : null);

    return {
      key: t.cow,
      cow_display: t.cow_display,
      morning: t.morning,
      morningDiff: diff(t.morning, y.morning),
      afternoon: t.afternoon,
      afternoonDiff: diff(t.afternoon, y.afternoon),
      evening: t.evening,
      eveningDiff: diff(t.evening, y.evening),
      total: t.total,
      totalDiff: diff(t.total, y.total),
    };
  });

  /* ----------------------------------
     Table columns (pivoted)
  ---------------------------------- */
  const columns = [
    {
      title: "Cow",
      dataIndex: "cow_display",
      fixed: "left",
      render: (v) => <strong>{v}</strong>,
    },
    {
      title: "Morning (L)",
      render: (_, r) => (
        <>
          <strong>{r.morning}</strong>
          <DiffBadge diff={r.morningDiff} />
        </>
      ),
    },
    {
      title: "Afternoon (L)",
      render: (_, r) => (
        <>
          <strong>{r.afternoon}</strong>
          <DiffBadge diff={r.afternoonDiff} />
        </>
      ),
    },
    {
      title: "Evening (L)",
      render: (_, r) => (
        <>
          <strong>{r.evening}</strong>
          <DiffBadge diff={r.eveningDiff} />
        </>
      ),
    },
    {
      title: "Total (L)",
      render: (_, r) => (
        <span style={{ fontSize: 16 }}>
          <strong>{r.total}</strong>
          <DiffBadge diff={r.totalDiff} />
        </span>
      ),
    },
  ];
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
            value={0}
            subtitle="No target set for this month"
          // extra={<Button type="primary">Learn More</Button>}
          />

        </Col>
      </Row>
      <Row gutter={16}>

        <Col xs={24} sm={24} md={24} lg={17}>
          <Card title="Latest Transactions" extra={<CardDropdown items={latestTransactionOption} />}>
            <Table
              className="no-border-last"
              columns={columns}
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
