import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const CREATE_ISSUE = gql`
  mutation createIssue(
    $title: String!
    $description: String!
    $priority: ISSUE_PRIORITY!
    $estimation: Int!
    $status: ISSUE_STATUS!
    $assignedToId: String!
    $projectId: String!
  ) {
    createIssue(
      data: {
        title: $title
        description: $description
        priority: $priority
        estimation: $estimation
        status: $status
        assignedToId: $assignedToId
        projectId: $projectId
      }
    ) {
      id
      title
      description
    }
  }
`;

const useCreateIssue = () => {
  const [createIssue] = useMutation(CREATE_ISSUE);

  return {
    createIssue,
  };
};

export { useCreateIssue };
