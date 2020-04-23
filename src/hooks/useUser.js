import { useMemo } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      name
      issues {
        id
        title
        status
      }
    }
  }
`;

const useUser = (id) => {
  let { loading, error, data, refetch } = useQuery(GET_USER, {
    variables: {
      id,
    },
  });

  data = useMemo(() => {
    if (data) {
      return {
        ...data,
        issuesByStatus: {
          new: data.user.issues.filter((issue) => issue.status === "NEW"),
          in_progress: data.user.issues.filter(
            (issue) => issue.status === "IN_PROGRESS"
          ),
          pending: data.user.issues.filter(
            (issue) => issue.status === "PENDING"
          ),
          closed: data.user.issues.filter((issue) => issue.status === "CLOSED"),
        },
      };
    }
    return null;
  }, [data]);

  return {
    loading,
    error,
    data,
    refetch,
  };
};

export { useUser };
