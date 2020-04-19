import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_PROJECT_DETAILS = gql`
  query getProjectDetails($id: ID!, $orderBy: IssueOrderByInput) {
    project(id: $id) {
      id
      name
      description
      issues(orderBy: $orderBy) {
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

const useProjectDetails = (id, orderBy) => {
  let { loading, error, data, refetch } = useQuery(GET_PROJECT_DETAILS, {
    variables: {
      id,
      orderBy,
    },
  });

  return {
    loading,
    error,
    data,
    refetch,
  };
};

export { useProjectDetails };
