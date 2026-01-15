// import { useMemo } from "react";
// import {
//   DashboardOutlined,
//   AppstoreOutlined,
//   BookOutlined,
//   FileUnknownOutlined,
//   ProfileOutlined
// } from "@ant-design/icons";
// import { APP_PREFIX_PATH } from "configs/AppConfig";

// const useNavigationConfig = () => {
//   const HAS_PERMISSION = true; // 🔓 allow everything (for now)
//   const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//   const isSystemOwner = userDetails?.roles === "system_owner";


//   const navigationConfig = useMemo(() => {
//     return [
//       HAS_PERMISSION && {
//         key: 'dashboards',
//         path: `${APP_PREFIX_PATH}/dashboards`,
//         title: 'sidenav.dashboard',
//         icon: DashboardOutlined,
//         breadcrumb: false,
//         isGroupTitle: true,
//         submenu: [
//           {
//             key: 'dashboards-default',
//             path: `${APP_PREFIX_PATH}/dashboards/default`,
//             title: 'sidenav.dashboard.default',
//             icon: DashboardOutlined,
//             breadcrumb: false,
//             submenu: []
//           },
//         ],
//       },

//       HAS_PERMISSION && {
//         key: 'apps',
//         path: `${APP_PREFIX_PATH}/apps`,
//         title: 'sidenav.apps',
//         icon: AppstoreOutlined,
//         breadcrumb: false,
//         isGroupTitle: true,
//         submenu: [
//           isSystemOwner && {
//             key: 'apps-farms',
//             path: `${APP_PREFIX_PATH}/apps/farms`,
//             title: 'sidenav.apps.farms',
//             breadcrumb: false,
//             submenu: [
//               {
//                 key: 'apps-farms-list',
//                 path: `${APP_PREFIX_PATH}/apps/farms/list`,
//                 title: 'sidenav.apps.farms-list',
//                 breadcrumb: false,
//                 submenu: []
//               },
//             ]
//           },
//           {
//             key: 'apps-production',
//             path: `${APP_PREFIX_PATH}/apps/chat`,
//             title: 'sidenav.apps.production',

//             breadcrumb: false,
//             submenu: [
//               {
//                 key: 'apps-production-milk',
//                 path: `${APP_PREFIX_PATH}/apps/production/dashboard`,
//                 title: 'sidenav.apps.milk-production',
//                 breadcrumb: false,
//                 submenu: []
//               },
//               {
//                 key: 'apps-production-cows',
//                 path: `${APP_PREFIX_PATH}/apps/mail/inbox`,
//                 title: 'sidenav.apps.cows-production',
//                 breadcrumb: false,
//                 submenu: []
//               },
//               {
//                 key: 'apps-production-feeds',
//                 path: `${APP_PREFIX_PATH}/apps/mail/inbox`,
//                 title: 'sidenav.apps.feeds-management',
//                 breadcrumb: false,
//                 submenu: []
//               },
//               {
//                 key: 'apps-animals-health',
//                 path: `${APP_PREFIX_PATH}/apps/mail/inbox`,
//                 title: 'sidenav.apps.animals-health',
//                 breadcrumb: false,
//                 submenu: []
//               },
//               {
//                 key: 'apps-animals-breeding',
//                 path: `${APP_PREFIX_PATH}/apps/mail/inbox`,
//                 title: 'sidenav.apps.animals-breeding',
//                 breadcrumb: false,
//                 submenu: []
//               },
//             ]
//           },
//           {
//             key: 'apps-farm-financials',
//             path: `${APP_PREFIX_PATH}/apps/chat`,
//             title: 'sidenav.apps.financials',
//             // icon: MessageOutlined,
//             breadcrumb: false,
//             submenu: [
//               {
//                 key: 'apps-income',
//                 path: `${APP_PREFIX_PATH}/apps/farms/list`,
//                 title: 'sidenav.apps.income',
//                 breadcrumb: false,
//                 submenu: []
//               },
//               {
//                 key: 'apps-expenses',
//                 path: `${APP_PREFIX_PATH}/apps/farms/list`,
//                 title: 'sidenav.apps.expenses',
//                 breadcrumb: false,
//                 submenu: []
//               },
//               {
//                 key: 'apps-reports',
//                 path: `${APP_PREFIX_PATH}/apps/farms/list`,
//                 title: 'sidenav.apps.reports',
//                 breadcrumb: false,
//                 submenu: []
//               },

//             ]
//           },
//         ]
//       },

//       HAS_PERMISSION && {
//         key: 'app-settings',
//         path: `${APP_PREFIX_PATH}/settings`,
//         title: 'sidenav.settings',
//         icon: BookOutlined,
//         breadcrumb: false,
//         isGroupTitle: true,
//         submenu: [
//           {
//             key: 'user-profile',
//             path: `${APP_PREFIX_PATH}/docs/documentation`,
//             title: 'sidenav.settings.user-profile',
//             icon: FileUnknownOutlined,
//             breadcrumb: false,
//             submenu: []
//           },
//           {
//             key: 'user-management',
//             path: `${APP_PREFIX_PATH}/docs/documentation/changelog`,
//             title: 'sidenav.settings.user-management',
//             icon: ProfileOutlined,
//             breadcrumb: false,
//             submenu: [
//               {
//                 key: 'user-list',
//                 path: `${APP_PREFIX_PATH}/docs/documentation/changelog`,
//                 title: 'sidenav.settings.user-list',
//                 icon: FileUnknownOutlined,
//                 breadcrumb: false,
//                 submenu: []
//               }
//             ]
//           }
//         ]
//       },



//     ].filter(Boolean);
//   }, []);

//   return navigationConfig;
// };

// export default useNavigationConfig;
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

