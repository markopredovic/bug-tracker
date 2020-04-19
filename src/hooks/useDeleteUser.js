import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const DELETE_USER = gql`
  mutation deleteUser {
    deleteUser {
      id
      name
      email
    }
  }
`;

const useDeleteUser = () => {
  const [deleteUser] = useMutation(DELETE_USER);

  return {
    deleteUser,
  };
};

export { useDeleteUser };
