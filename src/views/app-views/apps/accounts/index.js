import React, { useEffect, useState } from 'react'
import { Button, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import AddFarmModal from 'views/app-views/apps/accounts/addaccount'
import API from 'services/Api'
import { useNavigate } from "react-router-dom";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const AccountstList = () => {
  const [farms, setFarms] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();

  const fetchFarms = async () => {
    try {
      setLoading(true)
      // const res = await axios.get('/api/farms/') // 👈 adjust if needed
      const res = await API('accounts/list/', 'GET') // 👈 adjust if needed
      console.log(res)
      setFarms(res.data)
    } catch (err) {
      message.error('Failed to load accounts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFarms()
  }, [])

  const addFarm = async farm => {
    try {
      // await axios.post('/api/farms/', farm)
      await API('accounts/create/', 'POST', farm)
      message.success('Farm added successfully')
      setOpen(false)
      fetchFarms() // 🔁 refresh table
    } catch (err) {
      message.error('Failed to add farm')
    }
  }

  const columns = [
    {
      title: 'Account Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Account Type',
      dataIndex: 'account_type',
      key: 'account_type',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: value => value ? new Date(value).toLocaleDateString() : '-',
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
    // Implement navigation to account details page
     navigate(`${APP_PREFIX_PATH}/apps/accounts/details/${record.id}`)
  }


  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h3>Registered Farms</h3>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          Register New Account
        </Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={farms}
        loading={loading}
        bordered
        pagination={{ pageSize: 10 }}
      />

      <AddFarmModal
        open={open}
        onCancel={() => setOpen(false)}
        onSubmit={addFarm}
      />
    </>
  )
}

export default AccountstList
