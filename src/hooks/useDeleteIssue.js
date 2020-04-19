import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const DELETE_ISSUE = gql`
  mutation deleteIssue($id: ID!) {
    deleteIssue(id: $id) {
      id
      title
    }
  }
`;

const useDeleteIssue = () => {
  const [deleteIssue] = useMutation(DELETE_ISSUE);

  return {
    deleteIssue,
  };
};

export { useDeleteIssue };
