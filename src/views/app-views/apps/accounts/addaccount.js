import React, { useEffect } from 'react'
import { Modal, Form, Input, Select } from 'antd'

const { Option } = Select

const AddAccountModal = ({ open, onCancel, onSubmit }) => {
  const [form] = Form.useForm()

  const accountType = Form.useWatch('account_type', form)

  const handleOk = async () => {
    const values = await form.validateFields()
    onSubmit(values)
    form.resetFields()
  }

  useEffect(() => {
    if (!open) {
      form.resetFields()
    }
  }, [open, form])

  return (
    <Modal
      title="Register New Account"
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Create Account"
      destroyOnClose
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={{ account_type: 'company' }}
      >
        {/* Account Type */}
        <Form.Item
          label="Account Type"
          name="account_type"
          rules={[{ required: true, message: 'Account type is required' }]}
        >
          <Select>
            <Option value="individual">Individual</Option>
            <Option value="company">Company</Option>
          </Select>
        </Form.Item>

        {/* Account Name */}
        <Form.Item
          label="Account Name"
          name="name"
          rules={[{ required: true, message: 'Account name is required' }]}
        >
          <Input placeholder="e.g. Green Pastures Farm" />
        </Form.Item>

        {/* Conditional Fields */}
        {accountType === 'individual' && (
          <Form.Item
            label="National ID"
            name="national_id"
            rules={[{ required: true, message: 'National ID is required' }]}
          >
            <Input placeholder="National ID Number" />
          </Form.Item>
        )}

        {accountType === 'company' && (
          <Form.Item
            label="Company Registration Number"
            name="company_reg_no"
            rules={[
              { required: true, message: 'Company registration number is required' },
            ]}
          >
            <Input placeholder="e.g. CPR/2025/0091" />
          </Form.Item>
        )}

        {/* Phone */}
        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: 'Phone number is required' },
          ]}
        >
          <Input placeholder="+254700123456" />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { type: 'email', message: 'Enter a valid email' },
            { required: true, message: 'Email is required' },
          ]}
        >
          <Input placeholder="info@example.com" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddAccountModal
