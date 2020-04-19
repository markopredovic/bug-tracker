import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_PROJECTS = gql`
  {
    projects {
      id
      name
      description
      issues {
        id
      }
    }
  }
`;

const useProjects = () => {
  let { loading, error, data, refetch } = useQuery(GET_PROJECTS);

  return {
    loading,
    error,
    data,
    refetch,
  };
};

export { useProjects };
