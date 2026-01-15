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

const MilkTableRecords = () => {
  const [records, setRecords] = useState([]);
  const [cows, setCows] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  /* ----------------------------------
     Fetch data
  ---------------------------------- */
  const fetchRecords = async () => {
    const res = await API("production/milk-records/", "GET");
    setRecords(res.data);
  };

  const fetchCows = async () => {
    const res = await API("accounts/getcows/", "GET");
    setCows(res.data);

    // Prefill rows (Excel-style)
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
     Submit (explode rows → records)
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
     Excel-style columns
  ---------------------------------- */
  const excelColumns = [
    {
      title: "Cow",
      dataIndex: "cow_display",
      fixed: "left",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Morning (L)",
      dataIndex: "morning",
      render: (_, record, i) => (
        <InputNumber
          min={0}
          style={{ width: "100%" }}
          placeholder="0.0"
          value={record.morning}
          onChange={(v) => {
            const r = [...rows];
            r[i].morning = v;
            setRows(r);
          }}
        />
      ),
    },
    {
      title: "Afternoon (L)",
      dataIndex: "afternoon",
      render: (_, record, i) => (
        <InputNumber
          min={0}
          style={{ width: "100%" }}
          placeholder="0.0"
          value={record.afternoon}
          onChange={(v) => {
            const r = [...rows];
            r[i].afternoon = v;
            setRows(r);
          }}
        />
      ),
    },
    {
      title: "Evening (L)",
      dataIndex: "evening",
      render: (_, record, i) => (
        <InputNumber
          min={0}
          style={{ width: "100%" }}
          placeholder="0.0"
          value={record.evening}
          onChange={(v) => {
            const r = [...rows];
            r[i].evening = v;
            setRows(r);
          }}
        />
      ),
    },
    {
      title: "Notes",
      dataIndex: "notes",
      render: (_, record, i) => (
        <Input
          value={record.notes}
          onChange={(e) => {
            const r = [...rows];
            r[i].notes = e.target.value;
            setRows(r);
          }}
        />
      ),
    },
  ];

  /* ----------------------------------
     Dashboard summaries (unchanged)
  ---------------------------------- */
  const today = dayjs().format("YYYY-MM-DD");
  const todaysRecords = records.filter((r) => r.date === today);

  const totalMilkToday = todaysRecords.reduce(
    (sum, r) => sum + Number(r.quantity_in_liters),
    0
  );

  const milkByCow = todaysRecords.reduce((acc, r) => {
    acc[r.cow_display] =
      (acc[r.cow_display] || 0) + Number(r.quantity_in_liters);
    return acc;
  }, {});

  const pieData = Object.entries(milkByCow).map(([name, value]) => ({
    name,
    value,
  }));
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).format("DD MMM YYYY"),
    },
    {
      title: "Cow",
      dataIndex: "cow_display",
      key: "cow_display",
    },
    {
      title: "Session",
      dataIndex: "session",
      key: "session",
      render: (session) => (
        <Tag color={session === "morning" ? "gold" : "blue"}>
          {session.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Quantity (L)",
      dataIndex: "quantity_in_liters",
      key: "quantity_in_liters",
      render: (q) => <strong>{q} L</strong>,
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      ellipsis: true,
    },
  ];
  const getSessionDiff = (record) => {
    const yesterday = dayjs(record.date)
      .subtract(1, "day")
      .format("YYYY-MM-DD");

    const yesterdayKey = `${record.cow}-${yesterday}-${record.session}`;
    const yesterdayQty = recordIndex[yesterdayKey];

    if (yesterdayQty === undefined) return null;

    return Number(record.quantity_in_liters) - yesterdayQty;
  };
  const renderDiff = (diff) => {
    if (diff === null) return null;

    if (diff > 0) {
      return (
        <span style={{ color: "#3f8600", marginLeft: 8 }}>
          ▲ +{diff.toFixed(2)}L
        </span>
      );
    }

    if (diff < 0) {
      return (
        <span style={{ color: "#cf1322", marginLeft: 8 }}>
          ▼ {diff.toFixed(2)}L
        </span>
      );
    }

    return (
      <span style={{ color: "#8c8c8c", marginLeft: 8 }}>
        ▬ 0.00L
      </span>
    );
  };

  const aggregatedByCow = Object.values(
    records.reduce((acc, record) => {
      const cowKey = record.cow_display;

      if (!acc[cowKey]) {
        acc[cowKey] = {
          key: cowKey,
          cow_display: cowKey,
          total_quantity: 0,
          breakdown: [],
        };
      }

      acc[cowKey].total_quantity += Number(record.quantity_in_liters);

      acc[cowKey].breakdown.push({
        key: `${record.id}-${record.session}`,
        cow: record.cow,                 // ✅ REQUIRED
        session: record.session,
        quantity_in_liters: record.quantity_in_liters,
        date: record.date,
        notes: record.notes,
      });


      return acc;
    }, {})
  );
  const aggregatedColumns = [
    {
      title: "Cow",
      dataIndex: "cow_display",
      key: "cow_display",
    },
    {
      title: "Total Milk (L)",
      dataIndex: "total_quantity",
      key: "total_quantity",
      render: (q) => <strong>{q.toFixed(2)} L</strong>,
    },
  ];
  const expandedRowRender = (record) => {
    const breakdownColumns = [
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        render: (date) => dayjs(date).format("DD MMM YYYY"),
      },
      {
        title: "Session",
        dataIndex: "session",
        key: "session",
        render: (session) => (
          <Tag color={session === "morning" ? "gold" : "blue"}>
            {session.toUpperCase()}
          </Tag>
        ),
      },
      {
        title: "Quantity (L)",
        dataIndex: "quantity_in_liters",
        key: "quantity_in_liters",
        render: (q, record) => {
          const diff = getSessionDiff(record);

          return (
            <span>
              <strong>{q} L</strong>
              {renderDiff(diff)}
            </span>
          );
        },
      },

      {
        title: "Notes",
        dataIndex: "notes",
        key: "notes",
        ellipsis: true,
      },
    ];

    return (
      <Table
        columns={breakdownColumns}
        dataSource={record.breakdown}
        pagination={false}
        rowKey="key"
        size="small"
      />
    );
  };

  const recordIndex = records.reduce((acc, r) => {
    const key = `${r.cow}-${r.date}-${r.session}`;
    acc[key] = Number(r.quantity_in_liters);
    return acc;
  }, {});



  /* ----------------------------------
     Render
  ---------------------------------- */
  return (
    <>
      <PageHeaderAlt background="/img/others/img-17.jpg" cssClass="bg-primary" overlap />

      <Card>
        
        <Table
          columns={aggregatedColumns}
          dataSource={aggregatedByCow}
          loading={loading}
          bordered
          expandable={{
            expandedRowRender,
          }}
          pagination={false}
        />
      </Card>
    </>
  );
};

export default MilkTableRecords;
