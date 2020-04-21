import React, { useEffect } from "react";
import { useProjects } from "../hooks/useProjects";
import ProjectChart from "./ProjectChart";
import HerokuSlowInitLoad from "./messages/HerokuSlowInitLoad";

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
    return <HerokuSlowInitLoad />;
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
