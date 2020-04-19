import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
      name
    }
  }
`;

const useDeleteProject = () => {
  const [deleteProject] = useMutation(DELETE_PROJECT);

  return {
    deleteProject,
  };
};

export { useDeleteProject };
