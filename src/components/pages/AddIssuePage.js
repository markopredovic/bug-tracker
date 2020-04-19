import React from "react";
import Layout from "../UI/Layout";
import PageTitle from "../PageTitle";
import AddIssueForm from "../forms/AddIssueForm";

const AddIssuePage = () => {
  return (
    <Layout>
      <PageTitle title="Add issue" />
      <AddIssueForm />
    </Layout>
  );
};

export default AddIssuePage;
