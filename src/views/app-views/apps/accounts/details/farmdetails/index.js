import React, { lazy, Suspense, useEffect, useMemo } from 'react'
import { Menu } from 'antd'
import InnerAppLayout from 'layouts/inner-app-layout'
import { Routes, Route, Navigate, Link, useLocation, useParams } from 'react-router-dom'
import Loading from 'components/shared-components/Loading'
import API from 'services/Api'


const menuList = [
  {
    name: 'Farm Information',
    key: 'info',
  },
  {
    name: 'Manage Cows',
    key: 'cows',
  },
]

const FarmInfo = lazy(() => import('views/app-views/apps/accounts/details/farmdetails/farminfo'))
const ManageCows = lazy(() => import('views/app-views/apps/accounts/details/farmdetails/managecows'))

const FarmMenu = () => {
  const farmid = useParams().id
  const location = useLocation()
  const baseUrl = `/apps/farm/details/${farmid}`
  const currentKey = location.pathname.split('/').pop()

  const items = useMemo(
    () =>
      menuList.map(item => ({
        key: item.key,
        label: <Link to={item.key}>{item.name}</Link>,
      })),
    []
  )

  return (
    <Menu
      mode="inline"
      selectedKeys={[currentKey]}
      items={items}
      style={{ borderInlineEnd: 0 }}
    />
  )
}


/**
 * Main Account Page
 */
const Farm = () => {
  const farmid = useParams().id
  const [farmData, setFarmData] = React.useState(null)

  useEffect(() => {
    // You can fetch account-specific data here using the accountid
    const fetchFarmData = async () => {
      try {
        const response = await API(`accounts/farm/${farmid}/`, 'GET')
        setFarmData(response.data)
       
      } catch (error) {
        console.error('Failed to fetch farm data', error)
      }
    }

    fetchFarmData()
  }, [farmid])
  const refreshFarm = async () => {
    try {
      const response = await API(`accounts/farm/${farmid}/`, 'GET')
      setFarmData(response.data)
    } catch (error) {
      console.error('Failed to fetch farm data', error)
    }
  }

  return (
    <InnerAppLayout
      sideContent={<FarmMenu />}
      sideContentWidth={280}
      sideContentGutter={false}
      border
      mainContent={
        <div className="p-4">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="info" element={<FarmInfo farmData={farmData} refreshFarm={refreshFarm} />} />
              <Route path="cows" element={<ManageCows farmData={farmData} refreshFarm={refreshFarm}/>} />
              <Route path="*" element={<Navigate to="info" replace />} />
            </Routes>
          </Suspense>
        </div>
      }
    />
  )
}

export default Farm
