import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_FILTER_ISSUES = gql`
  query getIssuesByFilter(
    $query: String
    $status: ISSUE_STATUS
    $priority: ISSUE_PRIORITY
    $assignedToId: String
    $projectId: String
    $orderBy: IssueOrderByInput
  ) {
    issuesByFilter(
      filter: {
        title: $query
        description: $query
        status: $status
        priority: $priority
        assignedToId: $assignedToId
        projectId: $projectId
      }
      orderBy: $orderBy
    ) {
      id
      title
      description
      status
      priority
      estimation
      assignedTo {
        id
        name
      }
      project {
        id
        name
      }
      updatedAt
    }
  }
`;

const useIssuesByFilter = (issuesFilter) => {
  const { loading, error, data, refetch } = useQuery(GET_FILTER_ISSUES, {
    variables: {
      ...issuesFilter,
      orderBy: "updatedAt_DESC",
    },
  });

  return {
    loading,
    error,
    data,
    refetch,
  };
};

export { useIssuesByFilter };
