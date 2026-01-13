import React, { useEffect } from 'react'
import { Modal, Form, Input, Select } from 'antd'

const { Option } = Select

const AddEmployeeModal = ({ open, onCancel, onSubmit, farms }) => {
  const [form] = Form.useForm()

  const handleOk = async () => {
    const values = await form.validateFields()
    onSubmit(values)
    form.resetFields()
  }

  useEffect(() => {
    if (!open) form.resetFields()
  }, [open, form])

  return (
    <Modal
      title="Add Employee"
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Create Employee"
      destroyOnClose
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Full Name"
          name="full_name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { type: 'email' },
            { required: true },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="manager">Manager</Option>
            <Option value="employee">Employee</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Role Title"
          name="role_title"
        >
          <Input placeholder="e.g. Farm Supervisor" />
        </Form.Item>

        <Form.Item
          label="Assign Farms"
          name="farms"
        >
          <Select mode="multiple" allowClear>
            {farms.map(farm => (
              <Option key={farm.id} value={farm.id}>
                {farm.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, min: 6 }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddEmployeeModal
