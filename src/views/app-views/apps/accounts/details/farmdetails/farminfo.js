import React from 'react'
import { Card, Descriptions, Tag, Space } from 'antd'
import {
  BankOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'

const FarmInfo = ({ farmData }) => {
  if (!farmData) {
    return null
  }

  const {

    id,
    name,
    location,
    size_in_acres,
    created_at,
    is_active
  } = farmData

  return (
    <Card
      title={
        <Space>
          <BankOutlined />
          <span>Farm Information</span>
        </Space>
      }
      extra={
        is_active ? (
          <Tag icon={<CheckCircleOutlined />} color="green">
            Active
          </Tag>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="red">
            Inactive
          </Tag>
        )
      }
    >
      <Descriptions
        bordered
        size="middle"
        column={{ xs: 1, sm: 2 }}
      >
        <Descriptions.Item label="Farm Name">
          <strong>{name}</strong>
        </Descriptions.Item>

        {id && (
          <Descriptions.Item label="Farm Registration Number">
            {id}
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Size (Acres)">
          {size_in_acres || '—'}
        </Descriptions.Item>

        <Descriptions.Item label="Location">
          <Space>
            <EnvironmentOutlined />
            {location || '—'}
          </Space>
        </Descriptions.Item>

        <Descriptions.Item label="Created On">
          {new Date(created_at).toLocaleDateString()}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  )
}

export default FarmInfo
