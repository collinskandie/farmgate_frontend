import { useMemo } from "react";
import {
  DashboardOutlined,
  AppstoreOutlined,
  BookOutlined,
  FileUnknownOutlined,
  ProfileOutlined
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const useNavigationConfig = () => {
  const HAS_PERMISSION = true; // 🔓 allow everything (for now)

  const navigationConfig = useMemo(() => {
    return [
      HAS_PERMISSION && {
        key: 'dashboards',
        path: `${APP_PREFIX_PATH}/dashboards`,
        title: 'sidenav.dashboard',
        icon: DashboardOutlined,
        breadcrumb: false,
        isGroupTitle: true,
        submenu: [
          {
            key: 'dashboards-default',
            path: `${APP_PREFIX_PATH}/dashboards/default`,
            title: 'sidenav.dashboard.default',
            icon: DashboardOutlined,
            breadcrumb: false,
            submenu: []
          },
        ],
      },

      HAS_PERMISSION && {
        key: 'apps',
        path: `${APP_PREFIX_PATH}/apps`,
        title: 'sidenav.apps',
        icon: AppstoreOutlined,
        breadcrumb: false,
        isGroupTitle: true,
        submenu: [
          {
            key: 'apps-farms',
            path: `${APP_PREFIX_PATH}/apps/farms`,
            title: 'sidenav.apps.farms',
            breadcrumb: false,
            submenu: [
              {
                key: 'apps-farms-list',
                path: `${APP_PREFIX_PATH}/apps/farms/list`,
                title: 'sidenav.apps.farms-list',
                breadcrumb: false,
                submenu: []
              },
              {
                key: 'apps-farms-details',
                path: `${APP_PREFIX_PATH}/apps/mail/inbox`,
                title: 'sidenav.apps.farms-details',
                breadcrumb: false,
                submenu: []
              },
            ]
          },
          {
            key: 'apps-production',
            path: `${APP_PREFIX_PATH}/apps/chat`,
            title: 'sidenav.apps.production',
            // icon: MessageOutlined,
            breadcrumb: false,
            submenu: [
              {
                key: 'apps-production-milk',
                path: `${APP_PREFIX_PATH}/apps/farms/list`,
                title: 'sidenav.apps.milk-production',
                breadcrumb: false,
                submenu: []
              },
              {
                key: 'apps-production-cows',
                path: `${APP_PREFIX_PATH}/apps/mail/inbox`,
                title: 'sidenav.apps.cows-production',
                breadcrumb: false,
                submenu: []
              },
              {
                key: 'apps-production-feeds',
                path: `${APP_PREFIX_PATH}/apps/mail/inbox`,
                title: 'sidenav.apps.feeds-management',
                breadcrumb: false,
                submenu: []
              },
              {
                key: 'apps-animals-health',
                path: `${APP_PREFIX_PATH}/apps/mail/inbox`,
                title: 'sidenav.apps.animals-health',
                breadcrumb: false,
                submenu: []
              },
              {
                key: 'apps-animals-breeding',
                path: `${APP_PREFIX_PATH}/apps/mail/inbox`,
                title: 'sidenav.apps.animals-breeding',
                breadcrumb: false,
                submenu: []
              },
            ]
          },
          {
            key: 'apps-farm-financials',
            path: `${APP_PREFIX_PATH}/apps/chat`,
            title: 'sidenav.apps.financials',
            // icon: MessageOutlined,
            breadcrumb: false,
            submenu: [
              {
                key: 'apps-income',
                path: `${APP_PREFIX_PATH}/apps/farms/list`,
                title: 'sidenav.apps.income',
                breadcrumb: false,
                submenu: []
              },
              {
                key: 'apps-expenses',
                path: `${APP_PREFIX_PATH}/apps/farms/list`,
                title: 'sidenav.apps.expenses',
                breadcrumb: false,
                submenu: []
              },
              {
                key: 'apps-reports',
                path: `${APP_PREFIX_PATH}/apps/farms/list`,
                title: 'sidenav.apps.reports',
                breadcrumb: false,
                submenu: []
              },

            ]
          },
        ]
      },

      HAS_PERMISSION && {
        key: 'app-settings',
        path: `${APP_PREFIX_PATH}/settings`,
        title: 'sidenav.settings',
        icon: BookOutlined,
        breadcrumb: false,
        isGroupTitle: true,
        submenu: [
          {
            key: 'user-profile',
            path: `${APP_PREFIX_PATH}/docs/documentation`,
            title: 'sidenav.settings.user-profile',
            icon: FileUnknownOutlined,
            breadcrumb: false,
            submenu: []
          },
          {
            key: 'user-management',
            path: `${APP_PREFIX_PATH}/docs/documentation/changelog`,
            title: 'sidenav.settings.user-management',
            icon: ProfileOutlined,
            breadcrumb: false,
            submenu: [
              {
                key: 'user-list',
                path: `${APP_PREFIX_PATH}/docs/documentation/changelog`,
                title: 'sidenav.settings.user-list',
                icon: FileUnknownOutlined,
                breadcrumb: false,
                submenu: []
              }
            ]
          }
        ]
      },



    ].filter(Boolean);
  }, []);

  return navigationConfig;
};

export default useNavigationConfig;
