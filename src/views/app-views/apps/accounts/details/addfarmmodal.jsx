import React, { useEffect } from 'react'
import { Modal, Form, Input, InputNumber } from 'antd'

const AddFarmModal = ({ open, onCancel, onSubmit }) => {
  const [form] = Form.useForm()
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
      title="Add New Farm"
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Create Farm"
      destroyOnClose
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Farm Name"
          name="name"
          rules={[{ required: true, message: 'Farm name is required' }]}
        >
          <Input placeholder="e.g. Green Pastures Farm" />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: 'Location is required' }]}
        >
          <Input placeholder="e.g. Nyeri" />
        </Form.Item>

        <Form.Item
          label="Size (Acres)"
          name="size_in_acres"
          rules={[{ required: true, message: 'Farm size is required' }]}
        >
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            placeholder="e.g. 25.5"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddFarmModal
