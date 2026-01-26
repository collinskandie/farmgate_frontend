import React, { useState } from "react";
import { Row, Col, Card, DatePicker } from "antd";
import dayjs from "dayjs";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
// Breeding components (to be created)
import BreedingOverviewCards from "views/app-views/apps/breeding/BreedingOverviewCards";


const HeatBoard = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());

    return (
        <>
            <PageHeaderAlt
                background="/img/others/img-17.jpg"
                cssClass="bg-success"
                overlap
            >
                <div className="container text-center">
                    <h2 className="text-white">Heat Board</h2>
                    <p className="text-white-50">
                        Track cows heat
                    </p>
                </div>
            </PageHeaderAlt>
            <Card>
                <Row gutter={16}>
                    <p>Coming Soon</p>
                </Row>
            </Card>

        </>
    );
};

export default HeatBoard;
