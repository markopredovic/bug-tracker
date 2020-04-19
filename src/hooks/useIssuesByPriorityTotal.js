import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_TOTAL_ISSUES_BY_PRIORITY = gql`
  query getIssuesByPriorityTotal(
    $projectId: ID!
    $issuePriority: ISSUE_PRIORITY!
  ) {
    totalIssuesByPriorityPerProject(
      projectId: $projectId
      issuePriority: $issuePriority
    ) {
      priority
      count
    }
  }
`;

const useIssuesByPriorityTotal = (id) => {
  let resultPriorityData = {
    labels: ["HIGH", "NORMAL", "LOW"],
    series: [],
  };

  const _high_count = useQuery(GET_TOTAL_ISSUES_BY_PRIORITY, {
    variables: {
      projectId: id,
      issuePriority: "HIGH",
    },
  });

  const _normal_count = useQuery(GET_TOTAL_ISSUES_BY_PRIORITY, {
    variables: {
      projectId: id,
      issuePriority: "NORMAL",
    },
  });

  const _low_count = useQuery(GET_TOTAL_ISSUES_BY_PRIORITY, {
    variables: {
      projectId: id,
      issuePriority: "LOW",
    },
  });

  if (_high_count.data) {
    resultPriorityData.series.push(
      _high_count.data.totalIssuesByPriorityPerProject.count
    );
  }
  if (_normal_count.data) {
    resultPriorityData.series.push(
      _normal_count.data.totalIssuesByPriorityPerProject.count
    );
  }
  if (_low_count.data) {
    resultPriorityData.series.push(
      _low_count.data.totalIssuesByPriorityPerProject.count
    );
  }

  return {
    resultPriorityData,
  };
};

export { useIssuesByPriorityTotal };
