import React from "react";
import { Card, List, Tag } from "antd";

const UpcomingCalvings = ({ cows }) => {
  return (
    <Card title="Upcoming Calvings">
      <List
        dataSource={cows}
        renderItem={cow => (
          <List.Item>
            <strong>{cow.tag}</strong>
            <Tag color={cow.days_left < 7 ? "red" : "green"}>
              {cow.days_left} days
            </Tag>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default UpcomingCalvings;
