import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const GET_USERS = gql`
  {
    users {
      id
      name
      email
    }
  }
`;

const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  const users = data && data.users.map(user => <div>{user.name}</div>);

  return <div>{users}</div>;
};

export default Users;
