import React, { useEffect } from "react";
import { useProjects } from "../hooks/useProjects";
import ProjectChart from "./ProjectChart";

const HomeCharts = () => {
  const { data: projectsData, refetch: projectsRefetch } = useProjects();

  useEffect(() => {
    projectsRefetch();
  }, []);

  const projectsCharts =
    projectsData &&
    projectsData.projects
      .filter((project) => project.issues.length > 0)
      .map((project) => <ProjectChart key={project.id} {...project} />);

  return <div>{projectsCharts}</div>;
};

export default HomeCharts;
