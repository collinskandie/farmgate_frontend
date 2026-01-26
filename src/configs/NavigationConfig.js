// export default useNavigationConfig;
import { useMemo } from "react";
import {
  DashboardOutlined,
  AppstoreOutlined,
  BookOutlined,
  HeartOutlined,
  ProfileOutlined
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const useNavigationConfig = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const isSystemOwner = userDetails?.roles === "system_owner";

  const navigationConfig = useMemo(() => {
    return [
      {
        key: 'dashboards',
        path: `${APP_PREFIX_PATH}/dashboards`,
        title: 'sidenav.dashboard',
        icon: DashboardOutlined,
        isGroupTitle: true,
        submenu: [
          {
            key: 'dashboards-default',
            path: `${APP_PREFIX_PATH}/dashboards/default`,
            title: 'sidenav.dashboard.default',
            submenu: []
          },
        ],
      },
      {
        key: 'apps',
        path: `${APP_PREFIX_PATH}/apps`,
        title: 'sidenav.apps',
        icon: AppstoreOutlined,
        isGroupTitle: true,
        submenu: [
          // 👇 FARM MANAGEMENT — SYSTEM OWNER ONLY
          isSystemOwner && {
            key: 'apps-farms',
            path: `${APP_PREFIX_PATH}/apps/farms`,
            title: 'sidenav.apps.farms',
            submenu: [
              {
                key: 'apps-farms-list',
                path: `${APP_PREFIX_PATH}/apps/farms/list`,
                title: 'sidenav.apps.farms-list',
                submenu: []
              },
            ]
          },
          {
            key: 'apps-production',
            path: `${APP_PREFIX_PATH}/apps/production`,
            title: 'sidenav.apps.production',
            submenu: [
              {
                key: 'apps-production-milk',
                path: `${APP_PREFIX_PATH}/apps/production/dashboard`,
                title: 'sidenav.apps.milk-production',
                submenu: []
              },
              {
                key: 'apps-production-myfarm',
                path: `${APP_PREFIX_PATH}/apps/accounts/myaccount`,
                title: 'sidenav.apps.myaccount',
                submenu: []
              },
            ]
          },
          {
            key: 'apps-breeding',
            path: `${APP_PREFIX_PATH}/apps/breeding`,
            title: 'sidenav.apps.breeding',
            icon: HeartOutlined,
            submenu: [
              {
                key: 'apps-breeding-dashboard',
                path: `${APP_PREFIX_PATH}/apps/breeding/dashboard`,
                title: 'sidenav.apps.breeding.dashboard',
                submenu: []
              },
              {
                key: 'apps-breeding-heat',
                path: `${APP_PREFIX_PATH}/apps/breeding/heat`,
                title: 'sidenav.apps.breeding.heat',
                submenu: []
              },
              {
                key: 'apps-breeding-events',
                path: `${APP_PREFIX_PATH}/apps/breeding/events`,
                title: 'sidenav.apps.breeding.events',
                submenu: []
              },
              {
                key: 'apps-breeding-pregnancies',
                path: `${APP_PREFIX_PATH}/apps/breeding/pregnancies`,
                title: 'sidenav.apps.breeding.pregnancies',
                submenu: []
              },
              {
                key: 'apps-breeding-calving',
                path: `${APP_PREFIX_PATH}/apps/breeding/calving`,
                title: 'sidenav.apps.breeding.calving',
                submenu: []
              },
              {
                key: 'apps-breeding-history',
                path: `${APP_PREFIX_PATH}/apps/breeding/history`,
                title: 'sidenav.apps.breeding.history',
                submenu: []
              }
            ]
          }

        ].filter(Boolean),
      },

      {
        key: 'app-settings',
        path: `${APP_PREFIX_PATH}/settings`,
        title: 'sidenav.settings',
        icon: BookOutlined,
        isGroupTitle: true,
        submenu: [
          {
            key: 'user-profile',
            path: `${APP_PREFIX_PATH}/profile`,
            title: 'sidenav.settings.user-profile',
            submenu: []
          },
          isSystemOwner && {
            key: 'user-management',
            path: `${APP_PREFIX_PATH}/users`,
            title: 'sidenav.settings.user-management',
            icon: ProfileOutlined,
            submenu: [
              {
                key: 'user-list',
                path: `${APP_PREFIX_PATH}/users/list`,
                title: 'sidenav.settings.user-list',
                submenu: []
              }
            ]
          }
        ].filter(Boolean)
      },
    ];
  }, [isSystemOwner]);

  return navigationConfig;
};

export default useNavigationConfig;

