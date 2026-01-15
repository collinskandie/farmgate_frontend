import React, { lazy, Suspense, useEffect, useMemo } from 'react'
import { Menu } from 'antd'
import InnerAppLayout from 'layouts/inner-app-layout'
import { Routes, Route, Navigate, Link, useLocation, useParams } from 'react-router-dom'
import Loading from 'components/shared-components/Loading'
import API from 'services/Api'


const menuList = [
  {
    name: 'Account Information',
    key: 'info',
  },
  {
    name: 'Manage Farms',
    key: 'farms',
  },
  {
    name: 'Manage Employees',
    key: 'employees',
  },
]

const AccountInfo = lazy(() => import('views/app-views/apps/accounts/details/AccountInfo'))
const ManageFarms = lazy(() => import('views/app-views/apps/accounts/details/ManageFarms'))
const ManageEmployees = lazy(() => import('views/app-views/apps/accounts/details/ManageEmployees'))

const AccountMenu = () => {

  const userDetails = JSON.parse(localStorage.getItem('userDetails'))
  console.log('User Details in AccountMenu:', userDetails)
  const accountid = userDetails?.id
  console.log('Account ID in AccountMenu:', accountid)


  const location = useLocation()
  const baseUrl = `/apps/accounts/details/${accountid}`
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
const Account = () => {
  const accountid = useParams().id
  const [accountData, setAccountData] = React.useState(null)

  useEffect(() => {
    // You can fetch account-specific data here using the accountid
    const fetchAccountData = async () => {
      try {
        const response = await API(`accounts/${accountid}/`, 'GET')
        setAccountData(response.data)
        console.log('Account Data:', response.data)
      } catch (error) {
        console.error('Failed to fetch account data', error)
      }
    }

    fetchAccountData()
  }, [accountid])
  const refreshAccount = async () => {
    try {
      const response = await API(`accounts/${accountid}/`, 'GET')
      setAccountData(response.data)
      console.log('Account Data:', response.data)
    } catch (error) {
      console.error('Failed to fetch account data', error)
    }
  }

  return (
    <InnerAppLayout
      sideContent={<AccountMenu />}
      sideContentWidth={280}
      sideContentGutter={false}
      border
      mainContent={
        <div className="p-4">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="info" element={<AccountInfo accountData={accountData} refreshAccount={refreshAccount} />} />
              <Route path="farms" element={<ManageFarms accountData={accountData} refreshAccount={refreshAccount}/>} />
              <Route path="employees" element={<ManageEmployees accountData={accountData} refreshAccount={refreshAccount} />} />
              <Route path="*" element={<Navigate to="info" replace />} />
            </Routes>
          </Suspense>
        </div>
      }
    />
  )
}

export default Account
