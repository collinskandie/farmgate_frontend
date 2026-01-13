import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
  message,
  Space,
  Tag,
  Card,
} from "antd";
import {
  PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import API from "services/Api";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Pie } from "@ant-design/plots";

const { Option } = Select;
const { TextArea } = Input;


const MilkRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [cows, setCows] = useState([]);
  const [form] = Form.useForm();

  // ---------------------------------------
  // Fetch milk records
  // ---------------------------------------
  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await API("production/milk-records/", "GET", null);
      const data = response.data;
      setRecords(data);
    } catch (error) {
      console.error(error);
      message.error("Failed to load milk records");
    } finally {
      setLoading(false);
    }
  };
  const fetchCows = async () => {
    try {
      const response = await API("accounts/getcows/", "GET", null);
      const data = response.data;
      setCows(data);
    } catch (error) {
      console.error(error);
      message.error("Failed to load cows");
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchCows();
  }, []);

  // ---------------------------------------
  // Submit new milk record
  // ---------------------------------------
  const handleSubmit = async (values) => {
    try {
      const payload = {
        cow: values.cow, // ✅ REQUIRED
        date: values.date.format("YYYY-MM-DD"),
        session: values.session,
        quantity_in_liters: values.quantity, // ✅ CORRECT FIELD NAME
        notes: values.notes,
      };

      await API("production/milk-records/", "POST", payload);

      message.success("Milk record added 🥛");
      form.resetFields();
      setOpen(false);
      fetchRecords();
    } catch (error) {
      console.error(error);
      message.error("Failed to save milk record");
    }
  };


  // ---------------------------------------
  // Table columns
  // ---------------------------------------
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

  // ---------------------------------------
  // Derived data (today's milk)
  // ---------------------------------------
  const today = dayjs().format("YYYY-MM-DD");

  const todaysRecords = records.filter(
    (r) => r.date === today
  );

  const totalMilkToday = todaysRecords.reduce(
    (sum, r) => sum + Number(r.quantity_in_liters),
    0
  );

  // Group milk by cow for pie chart
  const milkByCow = todaysRecords.reduce((acc, record) => {
    const cow = record.cow_display;
    acc[cow] = (acc[cow] || 0) + Number(record.quantity_in_liters);
    return acc;
  }, {});

  const pieData = Object.entries(milkByCow).map(([name, value]) => ({
    name,
    value,
  }));

  // ---------------------------------------
  // Aggregate records per cow (for table)
  // ---------------------------------------
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
        render: (q) => <strong>{q} L</strong>,
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



  const pieConfig = {
    data: pieData,
    angleField: "value",
    colorField: "name",
    radius: 0.9,
    label: {
      type: "outer",
      content: "{name}: {value} L",
    },
    interactions: [{ type: "element-active" }],
  };


  // ---------------------------------------
  // Render
  // ---------------------------------------
  return (
    <>
      <PageHeaderAlt background="/img/others/img-17.jpg" cssClass="bg-primary" overlap>
        <div className="container text-center">
          <div className="py-3 my-md-3"></div>
        </div>
      </PageHeaderAlt>
      <Card>

        <Card style={{ marginBottom: 24 }}>
          <Space
            align="start"
            size="large"
            style={{ width: "100%", justifyContent: "space-between" }}
          >
            {/* Total Milk */}
            <div>
              <h4 style={{ marginBottom: 8 }}>Total Milk Collected Today</h4>
              <h1 style={{ margin: 0, color: "#1890ff" }}>
                {totalMilkToday.toFixed(2)} L
              </h1>
              <span className="text-muted">
                {dayjs().format("DD MMM YYYY")}
              </span>
            </div>

            {/* Pie Chart */}
            <div style={{ width: 400 }}>
              {pieData.length > 0 ? (
                <Pie {...pieConfig} />
              ) : (
                <p className="text-muted">No milk records for today</p>
              )}
            </div>
          </Space>
        </Card>

        <Space
          style={{ marginBottom: 16, width: "100%", justifyContent: "space-between" }}
        >
          <h3 style={{ margin: 0 }}>Milk Production Records</h3>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpen(true)}
          >
            Add Milk Record
          </Button>
        </Space>



        {/* <Table
          rowKey="id"
          columns={columns}
          dataSource={records}
          loading={loading}
          bordered
          pagination={{ pageSize: 10 }}
        /> */}
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


        {/* -------------------------------- */}
        {/* Add Milk Record Modal             */}
        {/* -------------------------------- */}
        <Modal
          title="Add Milk Record"
          open={open}
          onCancel={() => setOpen(false)}
          onOk={() => form.submit()}
          okText="Save"
          destroyOnClose
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              date: dayjs(),
              session: "morning",
            }}
          >
            <Form.Item
              label="Select Cow"
              name="cow"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select cow"
                options={cows.map((cow) => ({
                  value: cow.id,
                  label: `${cow.tag_number} - ${cow.name}(${cow.breed}) `,
                }))}
              />
            </Form.Item>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Session"
              name="session"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="morning">Morning</Option>
                <Option value="evening">Evening</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Milk Quantity (Litres)"
              name="quantity"
              rules={[
                { required: true, message: "Enter milk quantity" },
                { type: "number", min: 0.1 },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="e.g. 12.5"
              />
            </Form.Item>

            <Form.Item label="Notes" name="notes">
              <TextArea rows={3} placeholder="Optional notes" />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </>
  );
};

export default MilkRecords;
