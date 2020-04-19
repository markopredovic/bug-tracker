import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const SIGN_UP_USER = gql`
  mutation signUpUser(
    $name: String!
    $email: String!
    $password: String!
    $position: String!
    $projectsId: [String!]
  ) {
    createUser(
      data: {
        name: $name
        email: $email
        password: $password
        position: $position
        projectsId: $projectsId
      }
    ) {
      user {
        id
        name
        email
        position
      }
      token
    }
  }
`;

const useSignUpUser = () => {
  const [signUpUser] = useMutation(SIGN_UP_USER);

  return { signUpUser };
};

export { useSignUpUser };
