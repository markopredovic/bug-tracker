import React, { useEffect } from "react";
import { useProjects } from "../hooks/useProjects";
import ProjectChart from "./ProjectChart";
import { Spinner } from "react-bootstrap";

const HomeCharts = () => {
  const {
    loading,
    error,
    data: projectsData,
    refetch: projectsRefetch,
  } = useProjects();

  useEffect(() => {
    projectsRefetch();
  }, []);

  if (loading) {
    return (
      <div className="l-loading m-loading">
        <span className="mr-2">
          Please wait for initial connect to free heroku server
        </span>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  if (error) return `Error! ${error.message}`;

  const projectsCharts =
    projectsData &&
    projectsData.projects
      .filter((project) => project.issues.length > 0)
      .map((project) => <ProjectChart key={project.id} {...project} />);

  return <div>{projectsCharts}</div>;
};

export default HomeCharts;
