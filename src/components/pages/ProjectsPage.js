import React from "react";
import { Link } from "react-router-dom";
import Layout from "../UI/Layout";
import PageTitle from "../PageTitle";
import ProjectsList from "../ProjectsList";
import { Button } from "react-bootstrap";

const ProjectsPage = () => {
  return (
    <Layout>
      <PageTitle title="All Projects" />
      <Button as={Link} to="/projects/new" className="mb-4" size="lg">
        Add Project
      </Button>
      <ProjectsList />
    </Layout>
  );
};

export default ProjectsPage;
