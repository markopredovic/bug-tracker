import React from "react";
import { useHistory } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Layout from "../UI/Layout";
import PageTitle from "../PageTitle";
import AddProjectForm from "../forms/AddProjectForm";
import { Button } from "react-bootstrap";

const AddProjectsPage = () => {
  const history = useHistory();

  return (
    <Layout>
      <PageTitle title="Add new project" />
      <AddProjectForm />
      <Button
        className="mt-4"
        onClick={history.goBack}
        variant="dark"
        size="sm"
      >
        <FaArrowLeft /> Back
      </Button>
    </Layout>
  );
};

export default AddProjectsPage;
