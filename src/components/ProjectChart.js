import React from "react";
import Chart from "react-apexcharts";
import { useIssuesByStatusTotal } from "../hooks/useIssuesByStatusTotal";
import { useIssuesByPriorityTotal } from "../hooks/useIssuesByPriorityTotal";

const ProjectChart = ({ id, name }) => {
  const { resultData } = useIssuesByStatusTotal(id);
  const { resultPriorityData } = useIssuesByPriorityTotal(id);

  const options = {
    chart: {
      height: 380,
      width: "100%",
    },
    labels: !!resultData ? resultData.labels : [],
    series: !!resultData ? resultData.series : [],
    subtitle: {
      text: "issues by status",
      align: "left",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "12px",
        fontWeight: "normal",
        fontFamily: "sans-serif",
        color: "#9699a2",
      },
    },
  };

  const optionsPriority = {
    chart: {
      height: 380,
      width: "100%",
    },
    labels: !!resultPriorityData ? resultPriorityData.labels : [],
    series: !!resultPriorityData ? resultPriorityData.series : [],
    subtitle: {
      text: "issues by priority",
      align: "left",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "12px",
        fontWeight: "normal",
        fontFamily: "sans-serif",
        color: "#9699a2",
      },
    },
    theme: {
      palette: "palette6",
    },
  };

  return (
    <div className="mb-5">
      <h3>{name}</h3>
      <div className="d-md-flex">
        <Chart
          options={options}
          series={!!options.series && options.series}
          type="pie"
          width="380"
          className="mb-4 mb-md-0 mr-md-4"
        />
        <Chart
          options={optionsPriority}
          series={!!optionsPriority.series && optionsPriority.series}
          type="pie"
          width="380"
        />
      </div>
    </div>
  );
};

export default ProjectChart;
