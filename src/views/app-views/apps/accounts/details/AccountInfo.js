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

const AccountInfo = ({ accountData }) => {
  if (!accountData) {
    return null
  }

  const {
    name,
    account_type,
    company_reg_no,
    national_id,
    location,
    phone,
    email,
    is_active,
    created_at,
  } = accountData

  return (
    <>


      <Card
        title={
          <Space>
            <BankOutlined />
            <span>Account Information</span>
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
          <Descriptions.Item label="Account Name">
            <strong>{name}</strong>
          </Descriptions.Item>

          <Descriptions.Item label="Account Type">
            <Tag color="blue">
              {account_type === 'company' ? 'Company' : 'Individual'}
            </Tag>
          </Descriptions.Item>

          {company_reg_no && (
            <Descriptions.Item label="Company Reg No">
              {company_reg_no}
            </Descriptions.Item>
          )}

          {national_id && (
            <Descriptions.Item label="National ID">
              {national_id}
            </Descriptions.Item>
          )}

          <Descriptions.Item label="Location">
            <Space>
              <EnvironmentOutlined />
              {location || '—'}
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label="Phone">
            <Space>
              <PhoneOutlined />
              {phone || '—'}
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label="Email">
            <Space>
              <MailOutlined />
              {email || '—'}
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label="Created On">
            {new Date(created_at).toLocaleDateString()}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  )
}

export default AccountInfo
