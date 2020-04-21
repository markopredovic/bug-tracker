import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_TOTAL_FILTER_ISSUES = gql`
  query getTotalIssuesByFilter(
    $query: String
    $status: ISSUE_STATUS
    $priority: ISSUE_PRIORITY
    $assignedToId: String
    $projectId: String
  ) {
    totalIssuesByFilter(
      filter: {
        title: $query
        description: $query
        status: $status
        priority: $priority
        assignedToId: $assignedToId
        projectId: $projectId
      }
    ) {
      total
    }
  }
`;

const useTotalIssuesByFilter = (issuesFilter) => {
  const filter = {};
  filter.title = issuesFilter.title;
  filter.description = issuesFilter.description;
  filter.status = issuesFilter.status;
  filter.priority = issuesFilter.priority;
  filter.assignedToId = issuesFilter.assignedToId;
  filter.projectId = issuesFilter.projectId;

  const { loading, error, data, refetch } = useQuery(GET_TOTAL_FILTER_ISSUES, {
    variables: {
      ...filter,
    },
    fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    error,
    data,
    refetch,
  };
};

export { useTotalIssuesByFilter };
