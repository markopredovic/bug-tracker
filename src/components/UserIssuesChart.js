import React, { useContext, useEffect } from "react";
import Chart from "react-apexcharts";
import AppContext from "../context/appContext";
import { useUser } from "../hooks/useUser";

const UserIssuesChart = () => {
  const context = useContext(AppContext);

  const { data, refetch } = useUser(context.user.id);

  useEffect(() => {
    refetch();
  }, [data]);

  let seriesData = [];
  if (data) {
    seriesData.push(data.issuesByStatus.new.length);
    seriesData.push(data.issuesByStatus.in_progress.length);
    seriesData.push(data.issuesByStatus.pending.length);
    seriesData.push(data.issuesByStatus.closed.length);
  }

  const issuesChart = {
    options: {
      chart: {
        id: "user-issues-bar",
      },
      xaxis: {
        categories: ["New", "In Progress", "Pending", "Closed"],
      },
    },
    series: [
      {
        name: "total",
        data: seriesData,
      },
    ],
  };

  return (
    <div>
      <h3>All issues statistics</h3>
      {data && data.user.issues.length > 0 ? (
        <Chart
          options={issuesChart.options}
          series={issuesChart.series}
          type="bar"
          width="380"
        />
      ) : (
        "User hasn't any issue assigned to him"
      )}
    </div>
  );
};

export default UserIssuesChart;
