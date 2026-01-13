import React, { useState } from 'react'
import { Button, Table, Tag, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import AddEmployeeModal from 'views/app-views/apps/accounts/details/addemployeemodal'
import API from 'services/Api'

const ManageEmployees = ({ accountData, refreshAccount }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleAddEmployee = async values => {
    try {
      setLoading(true)

      await API(
        `accounts/${accountData.id}/users/create/`,
        'POST',
        values
      )

      message.success('Employee added successfully')
      setOpen(false)
      refreshAccount()
    } catch (err) {
      message.error('Failed to add employee')
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: role => <Tag color="blue">{role.replace('_', ' ')}</Tag>,
    },
    {
      title: 'Assigned Farms',
      dataIndex: 'farms',
      key: 'farms',
      render: farms =>
        farms?.length
          ? farms.map(f => (
            <Tag key={f.id} color="green">
              {f.name}
            </Tag>
          ))
          : '—',
    },
  ]
  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h3>Employees</h3>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          Add Employee
        </Button>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={accountData?.users || []}
        locale={{ emptyText: 'No employees found' }}
      />
      <AddEmployeeModal
        open={open}
        onCancel={() => setOpen(false)}
        onSubmit={handleAddEmployee}
        loading={loading}
        farms={accountData?.farms || []}
      />
    </>
  )
}

export default ManageEmployees
