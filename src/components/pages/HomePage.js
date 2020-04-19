import React from "react";
import Layout from "../UI/Layout";
import HomeCharts from "../HomeCharts";
import PageTitle from "../PageTitle";

const HomePage = () => {
  return (
    <Layout>
      <PageTitle title="Statistics" />
      <HomeCharts />
    </Layout>
  );
};

export default HomePage;
