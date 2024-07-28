"use client";
import { Divider, List, Typography } from "antd";
import React from "react";

const CoursesList = () => {
  const data = [
    { code: "FIT 9131", name: "Java" },
    { code: "FIT 9132", name: "Database" },
    { code: "FIT 9137", name: "Python" },
  ];
  return (
    <div className="max-w-80">
      <Divider />
      <List
        header={<Typography.Title level={4}>Courses List</Typography.Title>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>[{item.code}]</Typography.Text> {item.name}
          </List.Item>
        )}
      />
    </div>
  );
};

export default CoursesList;
