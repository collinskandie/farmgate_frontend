import React, { useState } from 'react'
import { Button, Table, Tag, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import AddCowModal from 'views/app-views/apps/accounts/details/farmdetails/addcowmodal'
import API from 'services/Api'

const ManageCows = ({ farmData, refreshFarm }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleAddCow = async values => {
    try {
      setLoading(true)
      await API(
        `accounts/farm/${farmData.id}/cows/create/`,
        'POST',
        values
      )
      message.success('Cow added successfully')
      setOpen(false)
      refreshFarm()
    } catch (err) {
      message.error('Failed to add cow')
    } finally {
      setLoading(false)
    }
  }
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tag Number',
      dataIndex: 'tag_number',
      key: 'tag_number',
    },
    {
      title: 'Breed',
      dataIndex: 'breed',
      key: 'breed',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
    },
    {
      title: 'Pregnancy Status',
      dataIndex: 'is_pregnant',
      key: 'is_pregnant',
      render: value =>
        value ? <Tag color="green">Pregnant</Tag> : <Tag>Not Pregnant</Tag>,
    },
  ]
  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h3>Cattle</h3>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          Add Cow
        </Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={farmData?.cows || []}
        locale={{ emptyText: 'No cows registered yet' }}
      />

      <AddCowModal
        open={open}
        onCancel={() => setOpen(false)}
        onSubmit={handleAddCow}
        loading={loading}
      />
    </>
  )
}

export default ManageCows
