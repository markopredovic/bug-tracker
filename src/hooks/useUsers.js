import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_USERS = gql`
  {
    users {
      id
      name
    }
  }
`;

const useUsers = () => {
  let { loading, error, data, refetch } = useQuery(GET_USERS);

  return {
    loading,
    error,
    data,
    refetch,
  };
};

export { useUsers };
