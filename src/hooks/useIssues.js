import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_ISSUES = gql`
  {
    issues {
      id
      title
      description
      status
      estimation
    }
  }
`;

const useIssues = () => {
  const { loading, error, data, refetch } = useQuery(GET_ISSUES);

  return {
    loading,
    error,
    data,
    refetch,
  };
};

export { useIssues };
