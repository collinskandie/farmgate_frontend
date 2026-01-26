import React, { useState } from "react";
import { Row, Col, Card, DatePicker } from "antd";
import dayjs from "dayjs";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";

// Breeding components (to be created)
import BreedingOverviewCards from "views/app-views/apps/breeding/BreedingOverviewCards";
import BreedingActivitySummary from "views/app-views/apps/breeding/BreedingActivitySummary";
import PregnancyStats from "views/app-views/apps/breeding/PregnancyStats";
import UpcomingCalvings from "views/app-views/apps/breeding/UpcomingCalvings";
import RecentBreedingEvents from "views/app-views/apps/breeding/RecentBreedingEvents";

const BreedingDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <>
      <PageHeaderAlt
        background="/img/others/img-17.jpg"
        cssClass="bg-success"
        overlap
      >
        <div className="container text-center">
          <h2 className="text-white">Breeding Dashboard</h2>
          <p className="text-white-50">
            Track breeding, pregnancies, and calving timelines
          </p>
        </div>
      </PageHeaderAlt>
      {/* KPI Cards */}
      <BreedingOverviewCards date={selectedDate} />
      {/* Main Panels */}
      <Row gutter={16}>
        <Col xs={24} lg={16}>
          <BreedingActivitySummary date={selectedDate} />
        </Col>
        <Col xs={24} lg={8}>
          <PregnancyStats date={selectedDate} />
        </Col>
      </Row>
      {/* Upcoming + Recent */}
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <UpcomingCalvings date={selectedDate} />
        </Col>
        <Col xs={24} lg={12}>
          <RecentBreedingEvents date={selectedDate} />
        </Col>
      </Row>
    </>
  );
};

export default BreedingDashboard;
