import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_TOTAL_ISSUES = gql`
  query getIssuesByStatusTotal($projectId: ID!, $issueStatus: ISSUE_STATUS!) {
    totalIssuesByStatusPerProject(
      projectId: $projectId
      issueStatus: $issueStatus
    ) {
      status
      count
    }
  }
`;

const useIssuesByStatusTotal = (id) => {
  let resultData = {
    labels: ["New", "In Progress", "Pending", "Closed"],
    series: [],
  };

  const _new_count = useQuery(GET_TOTAL_ISSUES, {
    variables: {
      projectId: id,
      issueStatus: "NEW",
    },
  });

  const _in_progress_count = useQuery(GET_TOTAL_ISSUES, {
    variables: {
      projectId: id,
      issueStatus: "IN_PROGRESS",
    },
  });

  const _pending_count = useQuery(GET_TOTAL_ISSUES, {
    variables: {
      projectId: id,
      issueStatus: "PENDING",
    },
  });

  const _closed_count = useQuery(GET_TOTAL_ISSUES, {
    variables: {
      projectId: id,
      issueStatus: "CLOSED",
    },
  });

  if (_new_count.data) {
    resultData.series.push(_new_count.data.totalIssuesByStatusPerProject.count);
  }
  if (_in_progress_count.data) {
    resultData.series.push(
      _in_progress_count.data.totalIssuesByStatusPerProject.count
    );
  }
  if (_pending_count.data) {
    resultData.series.push(
      _pending_count.data.totalIssuesByStatusPerProject.count
    );
  }
  if (_closed_count.data) {
    resultData.series.push(
      _closed_count.data.totalIssuesByStatusPerProject.count
    );
  }

  return {
    resultData,
  };
};

export { useIssuesByStatusTotal };
