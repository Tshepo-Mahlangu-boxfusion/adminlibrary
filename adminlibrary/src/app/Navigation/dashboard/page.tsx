"use client";

import React, { useEffect } from "react";
import { useStyles } from "./styles/style";
import { useBook,useBookState} from '../../../../providers/BookProvider';
import {
  ReadOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Typography } from "antd";

import BarChartComponent from "../../../../components/barChart";
import BorrowedBooksTable from "../../../../components/table";
import PieChartComponent from "../../../../components/pieChart";
import LineGraphComponent from "../../../../components/lineChart";
import  { useLoginState, useUser } from "../../../../providers/LoginProviders";
import WithAuth from "../../../../HOC/withAuth/page";


const Dashboard = () => {
  const { styles } = useStyles();
  const state=useBookState();
  const s=useLoginState();
  const {countBooks}=useBook();
  const {countUser}=useUser();
  useEffect(()=>{
      countBooks&&countBooks();
      countBooks&&countUser();
  },[])
 

  return (
    <div className={styles.main}>
    <Space size={10} direction="vertical" >
      <Typography.Title level={3} style={{ marginLeft: "45%", color: "black" }}>
        Dashboard
      </Typography.Title>
      <Space direction="horizontal" style={{ marginLeft: "20%" }}>
        <Card style={{ background: "transparent" }}>
          <Space direction="horizontal">
            <ReadOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
            <Statistic title="Total Books" value={`${state.CountBooks}`} />
          </Space>
        </Card>
        <Card style={{ background: "transparent" }}>
          <Space direction="horizontal">
            <StarOutlined
              style={{
                color: "yellow",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
            <Statistic title="Overdue Books" value={5245} />
          </Space>
        </Card>
        <Card style={{ background: "transparent" }}>
          <Space direction="horizontal">
            <ShoppingCartOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
            <Statistic title="Borrowed Books" value={5245} />
          </Space>
        </Card>
        <Card style={{ background: "transparent" }}>
          <Space direction="horizontal">
            <UserOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
            <Statistic title="Registered Users" value={`${s.CountUser}`}/>
          </Space>
        </Card>
      </Space>
      {/* <Typography.Title level={4}>Summary</Typography.Title> */}
      <Space direction="horizontal" align="center">
        <Card style={{ width: "200%", background: "transparent" }}>
          <BorrowedBooksTable />
        </Card>
        <Card style={{ width: "100%", marginLeft: "50%", background: "transparent" }}>
          <BarChartComponent />
        </Card>
      </Space>
      <Space direction="horizontal" align="center">
        <Card style={{ width: "95%", height: "200px", background: "transparent" }}>
          <Space direction="horizontal" align="center">
            <PieChartComponent />
            <PieChartComponent />
            <PieChartComponent />
          </Space>
        </Card>
        <Card style={{ background: "transparent" }}>
          <LineGraphComponent />
        </Card>
      </Space>
    </Space>

    </div>  );
};

export default WithAuth(Dashboard);

