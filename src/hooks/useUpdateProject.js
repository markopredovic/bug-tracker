import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const UPDATE_PROJECT = gql`
  mutation updateProject(
    $id: ID!
    $name: String
    $description: String
    $teamIds: [String!]
  ) {
    updateProject(
      id: $id
      data: { name: $name, description: $description, teamIds: $teamIds }
    ) {
      id
      name
      description
      issues {
        id
      }
      team {
        id
        name
        position
      }
    }
  }
`;

const useUpdateProject = () => {
  const [updateProject] = useMutation(UPDATE_PROJECT);

  return {
    updateProject,
  };
};

export { useUpdateProject };
