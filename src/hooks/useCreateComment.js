import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const CREATE_COMMENT = gql`
  mutation createComment(
    $issueId: String!
    $description: String!
    $spent: Int!
  ) {
    createComment(
      data: { issueId: $issueId, description: $description, spent: $spent }
    ) {
      id
      description
      spent
    }
  }
`;

const useCreateComment = () => {
  const [createComment] = useMutation(CREATE_COMMENT);

  return {
    createComment,
  };
};

export { useCreateComment };
