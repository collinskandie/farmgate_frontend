import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  InputNumber,
  message,
  Space,
  Tag,
  Card,
  Input,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import API from "services/Api";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Pie } from "@ant-design/plots";

/* ----------------------------------
   Small helper for diff rendering
---------------------------------- */
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

const MilkRecords = () => {
  const [records, setRecords] = useState([]);
  const [cows, setCows] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  /* ----------------------------------
     Fetch data
  ---------------------------------- */
  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await API("production/milk-records/", "GET");
      setRecords(res.data);
    } catch {
      message.error("Failed to load milk records");
    } finally {
      setLoading(false);
    }
  };

  const fetchCows = async () => {
    const res = await API("accounts/getcows/", "GET");
    setCows(res.data);

    // Prefill Excel-style rows
    setRows(
      res.data.map((cow) => ({
        key: cow.id,
        cow_id: cow.id,
        cow_display: `${cow.tag_number} - ${cow.name}`,
        morning: null,
        afternoon: null,
        evening: null,
        notes: "",
      }))
    );
  };

  useEffect(() => {
    fetchRecords();
    fetchCows();
  }, []);

  /* ----------------------------------
     Bulk submit
  ---------------------------------- */
  const handleSubmit = async () => {
    const payload = [];

    rows.forEach((row) => {
      ["morning", "afternoon", "evening"].forEach((session) => {
        if (row[session]) {
          payload.push({
            cow: row.cow_id,
            date: dayjs().format("YYYY-MM-DD"),
            session,
            quantity_in_liters: row[session],
            notes: row.notes,
          });
        }
      });
    });

    if (!payload.length) {
      message.warning("No milk quantities entered");
      return;
    }

    try {
      await API("production/milk-records/bulk/", "POST", payload);
      message.success("Milk records saved 🥛");
      setOpen(false);
      fetchRecords();
    } catch {
      message.error("Failed to save milk records");
    }
  };

  /* ----------------------------------
     Aggregate helpers
  ---------------------------------- */
  const today = dayjs().format("YYYY-MM-DD");
  const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");

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

  /* ----------------------------------
     Pie summary
  ---------------------------------- */
  const totalMilkToday = comparisonData.reduce(
    (sum, r) => sum + r.total,
    0
  );

  const pieData = comparisonData.map((r) => ({
    name: r.cow_display,
    value: r.total,
  }));

  /* ----------------------------------
     Render
  ---------------------------------- */
  return (
    <>
      <PageHeaderAlt background="/img/others/img-17.jpg" cssClass="bg-primary" overlap />

      <Card style={{ borderRadius: 12 }}>
        <Card
          style={{ marginBottom: 16 }}
          bodyStyle={{ padding: "12px 16px" }}
        >
          <Space style={{ width: "100%", justifyContent: "space-between" }}>
            <div>
              <h4 style={{ marginBottom: 4, fontSize: 14 }}>
                Total Milk Collected Today
              </h4>

              <h1
                style={{
                  margin: 0,
                  fontSize: 24,
                  lineHeight: "28px",
                  color: "#1890ff",
                }}
              >
                {totalMilkToday.toFixed(2)} L
              </h1>

              <span style={{ fontSize: 12, color: "#8c8c8c" }}>
                {dayjs().format("DD MMM YYYY")}
              </span>
            </div>

            <div style={{ width: 240, height: 120 }}>
              {pieData.length ? (
                <Pie
                  data={pieData}
                  angleField="value"
                  colorField="name"
                  radius={0.7}
                  height={120}
                />
              ) : (
                <p>No milk today</p>
              )}
            </div>
          </Space>
        </Card>
        <Card>
          <Space style={{ marginBottom: 16, justifyContent: "space-between", width: "100%" }}>
            <h3>Milk Production Summary</h3>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
              Add Today’s Milk
            </Button>
          </Space>

          <Table
            bordered
            loading={loading}
            pagination={false}
            columns={columns}
            dataSource={comparisonData}
            rowClassName={() => "hover-row"}
          />
        </Card>
        <Card>
          <h4 style={{ marginBottom: 16, marginTop: 16 }}>Detailed Milk Records</h4>
          <Table
            bordered
            loading={loading}
            pagination={{ pageSize: 10 }}
            columns={[
              {
                title: "Cow",
                dataIndex: "cow_display",
                fixed: "left",
              },
              {
                title: "Date",
                dataIndex: "date",
                render: (d) => dayjs(d).format("DD MMM YYYY"),
              },
              {
                title: "Session",
                dataIndex: "session",
                render: (s) => (
                  <Tag color={s === "morning" ? "gold" : "blue"}>
                    {s.toUpperCase()}
                  </Tag>
                ),
              },
              {
                title: "Quantity (L)",
                dataIndex: "quantity_in_liters",
                render: (q) => <strong>{q} L</strong>,
              },
              {
                title: "Notes",
                dataIndex: "notes",
                ellipsis: true,
              },
            ]}
            dataSource={records}
            rowKey="id"
            scroll={{ x: 700 }}
          />
        </Card>
        <Modal
          title={`Milk Entry – ${dayjs().format("DD MMM YYYY")}`}
          open={open}
          width={1000}
          onCancel={() => setOpen(false)}
          onOk={handleSubmit}
          okText="Save All"
        >
          <Table
            bordered
            size="small"
            pagination={false}
            columns={[
              { title: "Cow", dataIndex: "cow_display" },
              {
                title: "Morning",
                render: (_, r, i) => (
                  <InputNumber
                    min={0}
                    value={r.morning}
                    onChange={(v) => {
                      const copy = [...rows];
                      copy[i].morning = v;
                      setRows(copy);
                    }}
                  />
                ),
              },
              {
                title: "Afternoon",
                render: (_, r, i) => (
                  <InputNumber
                    min={0}
                    value={r.afternoon}
                    onChange={(v) => {
                      const copy = [...rows];
                      copy[i].afternoon = v;
                      setRows(copy);
                    }}
                  />
                ),
              },
              {
                title: "Evening",
                render: (_, r, i) => (
                  <InputNumber
                    min={0}
                    value={r.evening}
                    onChange={(v) => {
                      const copy = [...rows];
                      copy[i].evening = v;
                      setRows(copy);
                    }}
                  />
                ),
              },
              {
                title: "Notes",
                render: (_, r, i) => (
                  <Input
                    value={r.notes}
                    onChange={(e) => {
                      const copy = [...rows];
                      copy[i].notes = e.target.value;
                      setRows(copy);
                    }}
                  />
                ),
              },
            ]}
            dataSource={rows}
          />
        </Modal>
      </Card>
    </>
  );
};

export default MilkRecords;
