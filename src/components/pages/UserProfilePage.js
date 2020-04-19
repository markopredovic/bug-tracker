import React from "react";
import Layout from "../UI/Layout";
import PageTitle from "../PageTitle";
import UserProfile from "../UserProfile";

const UserProfilePage = () => {
  return (
    <Layout>
      <PageTitle title="Profile" />
      <UserProfile />
    </Layout>
  );
};

export default UserProfilePage;
