import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

const useLoginUser = () => {
  const [loginUser] = useMutation(LOGIN_USER);

  return { loginUser };
};

export { useLoginUser };
