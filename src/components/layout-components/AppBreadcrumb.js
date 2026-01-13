import React, { Component } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import useNavigationConfig from "configs/NavigationConfig";
import IntlMessage from 'components/util-components/IntlMessage';

const BreadcrumbRoute = () => {
	const location = useLocation();
	const navigationConfig = useNavigationConfig();

	let breadcrumbData = { 
		'/' : <IntlMessage id="home" />
	};

	navigationConfig.forEach((elm) => {
		const assignBreadcrumb = (obj) => {
			breadcrumbData[obj.path] = <IntlMessage id={obj.title} />;
		};
		assignBreadcrumb(elm);
		if (elm.submenu) {
			elm.submenu.forEach((sub) => {
				assignBreadcrumb(sub);
				if (sub.submenu) {
					sub.submenu.forEach(assignBreadcrumb);
				}
			});
		}
	});

	const pathSnippets = location.pathname.split('/').filter(i => i);
	const breadcrumbItems = pathSnippets.map((_, index) => {
		const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
		return {
			title: <Link to={url}>{breadcrumbData[url]}</Link>
		};
	});

	return <Breadcrumb items={breadcrumbItems} />;
};

export class AppBreadcrumb extends Component {
	render() {
		return <BreadcrumbRoute />;
	}
}

export default AppBreadcrumb;