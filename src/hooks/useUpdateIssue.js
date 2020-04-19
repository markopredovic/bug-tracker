import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const UPDATE_ISSUE = gql`
  mutation updateIssue(
    $id: ID!
    $title: String
    $description: String
    $estimation: Int
    $status: ISSUE_STATUS
    $priority: ISSUE_PRIORITY
    $percentDone: Int
    $assignedToId: String
  ) {
    updateIssue(
      data: {
        title: $title
        description: $description
        estimation: $estimation
        status: $status
        priority: $priority
        percentDone: $percentDone
        assignedToId: $assignedToId
      }
      id: $id
    ) {
      id
      title
      description
      estimation
      status
      priority
      percentDone
      assignedTo {
        id
        name
      }
    }
  }
`;

const useUpdateIssue = () => {
  const [updateIssue] = useMutation(UPDATE_ISSUE);

  return {
    updateIssue,
  };
};

export { useUpdateIssue };
