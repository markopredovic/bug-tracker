import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const CREATE_PROJECT = gql`
  mutation createProject(
    $name: String!
    $description: String!
    $teamIds: [String!]
  ) {
    createProject(
      data: { name: $name, description: $description, teamIds: $teamIds }
    ) {
      id
      name
      description
      team {
        id
        name
        position
      }
    }
  }
`;

const useCreateProject = () => {
  const [createProject] = useMutation(CREATE_PROJECT);

  return {
    createProject,
  };
};

export { useCreateProject };
