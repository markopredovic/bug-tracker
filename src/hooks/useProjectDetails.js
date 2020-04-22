import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_PROJECT_DETAILS = gql`
  query getProjectDetails(
    $id: ID!
    $status: ISSUE_STATUS
    $orderBy: IssueOrderByInput
    $first: Int
    $skip: Int
  ) {
    project(id: $id) {
      id
      name
      description
      issues(orderBy: $orderBy, status: $status, first: $first, skip: $skip) {
        id
        title
        description
        status
        priority
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
      team {
        id
        name
        position
      }
    }
  }
`;

const useProjectDetails = (id, status, orderBy) => {
  const first = 5;
  const skip = 0;
  let { loading, error, data, refetch, fetchMore } = useQuery(
    GET_PROJECT_DETAILS,
    {
      variables: {
        id,
        status,
        orderBy,
        first,
        skip,
      },
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

export { useProjectDetails };
