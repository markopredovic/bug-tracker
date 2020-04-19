import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_ISSUE_DETAILS = gql`
  query getIssueDetails($id: ID!) {
    issue(id: $id) {
      id
      title
      description
      status
      priority
      estimation
      spent
      percentDone
      assignedTo {
        id
        name
      }
      comments {
        id
        description
        createdAt
      }
    }
  }
`;

const useIssueDetails = (id) => {
  let { loading, error, data, refetch } = useQuery(GET_ISSUE_DETAILS, {
    variables: {
      id,
    },
  });

  return {
    loading,
    error,
    data,
    refetch,
  };
};

export { useIssueDetails };
