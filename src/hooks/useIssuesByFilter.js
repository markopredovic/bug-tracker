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
    $first: Int
    $skip: Int
    $after: String
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
      first: $first
      skip: $skip
      after: $after
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

const useIssuesByFilter = (issuesFilter, cb) => {
  const { loading, error, data, refetch, fetchMore } = useQuery(
    GET_FILTER_ISSUES,
    {
      variables: {
        ...issuesFilter,
        orderBy: "updatedAt_DESC",
      },
      fetchPolicy: "cache-and-network",
      partialRefetch: true,
      onCompleted: cb,
    }
  );

  return {
    loading,
    error,
    data,
    refetch,
    fetchMore,
  };
};

export { useIssuesByFilter };
