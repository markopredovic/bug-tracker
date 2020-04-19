import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const PROJECT_REMOVE_TEAM_USER = gql`
  mutation removeUserFromTeam($id: ID!, $userId: ID!) {
    removeUserFromTeam(id: $id, userId: $userId) {
      id
      name
      description
      issues {
        id
      }
      team {
        id
        name
        position
      }
    }
  }
`;

const useProjectRemoveTeamUser = () => {
  const [removeUserFromTeam] = useMutation(PROJECT_REMOVE_TEAM_USER);

  return {
    removeUserFromTeam,
  };
};

export { useProjectRemoveTeamUser };
