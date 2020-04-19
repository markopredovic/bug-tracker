import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_USER_PROFILE = gql`
  {
    me {
      id
      name
      email
      position
    }
  }
`;

const useUserProfile = () => {
  let { loading, error, data, refetch } = useQuery(GET_USER_PROFILE);

  return {
    loading,
    error,
    data,
    refetch,
  };
};

export { useUserProfile };
