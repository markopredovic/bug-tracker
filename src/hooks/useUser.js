import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`;

const useUser = (id) => {
  let { loading, error, data, refetch } = useQuery(GET_USER, {
    variables: {
      id,
    },
  });

  return {
    loading,
    error,
    data,
    refetch,
  };
};

export { useUser };
