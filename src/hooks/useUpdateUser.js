import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const UPDATE_USER = gql`
  mutation updateUser(
    $name: String
    $email: String
    $password: String
    $position: String
  ) {
    updateUser(
      data: {
        name: $name
        email: $email
        password: $password
        position: $position
      }
    ) {
      id
      name
      position
      email
      password
    }
  }
`;

const useUpdateUser = () => {
  const [updateUser] = useMutation(UPDATE_USER);

  return {
    updateUser,
  };
};

export { useUpdateUser };
