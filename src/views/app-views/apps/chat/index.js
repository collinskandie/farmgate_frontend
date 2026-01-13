import React, { useState } from 'react'
import { List, Button, Modal, Form, Input, Select, Card } from 'antd'
import InnerAppLayout from 'layouts/inner-app-layout'
import { PlusOutlined } from '@ant-design/icons'

const FarmerCattle = () => {
  const [selectedCow, setSelectedCow] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [cattle, setCattle] = useState([
    {
      id: 1,
      tag: 'COW-001',
      breed: 'Friesian',
      gender: 'Female',
      age: '4 years',
    },
    {
      id: 2,
      tag: 'COW-002',
      breed: 'Ayrshire',
      gender: 'Female',
      age: '3 years',
    },
  ])

  const addCattle = values => {
    setCattle(prev => [
      ...prev,
      {
        id: prev.length + 1,
        ...values,
      },
    ])
    setIsModalOpen(false)
  }

  /** Sidebar: cattle list */
  const sideContent = (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Farmer Cattle</h4>
        <Button
          type="primary"
          size="small"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <List
        dataSource={cattle}
        renderItem={item => (
          <List.Item
            className="cursor-pointer"
            onClick={() => setSelectedCow(item)}
          >
            <strong>{item.tag}</strong>
            <div className="text-muted">{item.breed}</div>
          </List.Item>
        )}
      />
    </>
  )

  /** Main: selected cow details */
  const mainContent = (
    <Card title="Cattle Details">
      {selectedCow ? (
        <>
          <p><strong>Tag:</strong> {selectedCow.tag}</p>
          <p><strong>Breed:</strong> {selectedCow.breed}</p>
          <p><strong>Gender:</strong> {selectedCow.gender}</p>
          <p><strong>Age:</strong> {selectedCow.age}</p>
        </>
      ) : (
        <p>Select a cow to view details</p>
      )}
    </Card>
  )

  return (
    <>
      <InnerAppLayout
        sideContent={sideContent}
        mainContent={mainContent}
        sideContentWidth={400}
        border
      />

      <Modal
        title="Add New Cattle"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={addCattle}>
          <Form.Item
            label="Cattle Tag"
            name="tag"
            rules={[{ required: true }]}
          >
            <Input placeholder="e.g. COW-003" />
          </Form.Item>

          <Form.Item
            label="Breed"
            name="breed"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="Friesian">Friesian</Select.Option>
              <Select.Option value="Ayrshire">Ayrshire</Select.Option>
              <Select.Option value="Jersey">Jersey</Select.Option>
              <Select.Option value="Guernsey">Guernsey</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Male">Male</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true }]}
          >
            <Input placeholder="e.g. 3 years" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Save Cattle
          </Button>
        </Form>
      </Modal>
    </>
  )
}

export default FarmerCattle
