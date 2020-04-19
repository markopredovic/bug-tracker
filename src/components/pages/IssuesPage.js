import React from "react";
import Layout from "../UI/Layout";
import PageTitle from "../PageTitle";
import IssuesList from "../IssuesList";

const IssuesPage = () => {
  return (
    <Layout>
      <PageTitle title="Issues" />
      <IssuesList />
    </Layout>
  );
};

export default IssuesPage;
