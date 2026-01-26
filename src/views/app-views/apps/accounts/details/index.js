import React, { lazy, Suspense, useEffect, useMemo } from 'react'
import { Menu,Card } from 'antd'
import InnerAppLayout from 'layouts/inner-app-layout'
import { Routes, Route, Navigate, Link, useLocation, useParams } from 'react-router-dom'
import Loading from 'components/shared-components/Loading'
import API from 'services/Api'
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";


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
  // const accountid = useParams().id
  const location = useLocation()
  // const baseUrl = `/apps/accounts/details/${accountid}`
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

const Account = () => {
  const accountid = useParams().id
  const [accountData, setAccountData] = React.useState(null)

  useEffect(() => {
    // You can fetch account-specific data here using the accountid
    const fetchAccountData = async () => {
      try {
        const response = await API(`accounts/${accountid}/`, 'GET')
        setAccountData(response.data)
        // console.log('Account Data:', response.data)
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
      // console.log('Account Data:', response.data)
    } catch (error) {
      console.error('Failed to fetch account data', error)
    }
  }

  return (
    <>
      <PageHeaderAlt background="/img/others/img-17.jpg" cssClass="bg-primary" overlap>
        <div className="container text-center">
          <div className="py-3 my-md-3"></div>
        </div>
      </PageHeaderAlt>
      <Card>
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
                  <Route path="farms" element={<ManageFarms accountData={accountData} refreshAccount={refreshAccount} />} />
                  <Route path="employees" element={<ManageEmployees accountData={accountData} refreshAccount={refreshAccount} />} />
                  <Route path="*" element={<Navigate to="info" replace />} />
                </Routes>
              </Suspense>
            </div>
          }
        />
      </Card>


    </>

  )
}

export default Account
