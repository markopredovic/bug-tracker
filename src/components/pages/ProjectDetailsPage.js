import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../UI/Layout";
import ProjectDetails from "../ProjectsList/ProjectDetails";

const ProjectDetailsPage = () => {
  const { id } = useParams();

  return (
    <Layout>
      <ProjectDetails id={id} />
    </Layout>
  );
};

export default ProjectDetailsPage;
