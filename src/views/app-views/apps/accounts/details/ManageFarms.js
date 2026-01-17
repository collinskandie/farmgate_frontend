import React, { useState } from 'react'
import { Button, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import AddFarmModal from 'views/app-views/apps/accounts/details/addfarmmodal'
import API from 'services/Api'
import { APP_PREFIX_PATH } from "configs/AppConfig";
import { useNavigate } from "react-router-dom";
import { render } from '@testing-library/react'

const ManageFarms = ({ accountData, refreshAccount }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleAddFarm = async values => {
    try {
      setLoading(true)

      await API(
        `accounts/${accountData.id}/farms/create/`,
        'POST',
        values
      )

      message.success('Farm created successfully')
      setOpen(false)
      refreshAccount()
    } catch (err) {
      message.error('Failed to create farm')
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    { title: 'Farm Name', dataIndex: 'name', key: 'name' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Size (Acres)', dataIndex: 'size_in_acres', key: 'size_in_acres' },
    {
      title: 'Created On', dataIndex: 'created_at', key: 'created_at',
      render: (text) => {
        const date = new Date(text);
        return date.toLocaleDateString();
      }
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button color="cyan" variant="outlined" onClick={() => handleViewDetails(record)}>
          View Account Details
        </Button>
      ),
    }
  ]
  const handleViewDetails = (record) => {
    navigate(`${APP_PREFIX_PATH}/apps/farm/details/${record.id}`)
  }

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h3>Farms</h3>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          Add Farm
        </Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={accountData?.farms || []}
        locale={{ emptyText: 'No farms registered yet' }}
      />

      <AddFarmModal
        open={open}
        onCancel={() => setOpen(false)}
        onSubmit={handleAddFarm}
        loading={loading}
      />
    </>
  )
}

export default ManageFarms
