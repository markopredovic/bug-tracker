import React, { useEffect, useState } from "react";
import Project from "./Project";
import { useProjects } from "../../hooks/useProjects";
import { getExcerpt } from "../../utility/common";
import { useDeleteProject } from "../../hooks/useDeleteProject";

const ProjectsList = () => {
  const [isProjectDeleted, setProjectDeleted] = useState(false);
  const { loading, error, data, refetch } = useProjects();
  const { deleteProject } = useDeleteProject();

  useEffect(() => {
    refetch();
  }, [data]);

  useEffect(() => {
    if (isProjectDeleted) {
      refetch();
      setProjectDeleted(false);
    }
  }, [isProjectDeleted]);

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error.message}`;

  const handleDeleteProject = async (id) => {
    await deleteProject({
      variables: {
        id,
      },
    });
    setProjectDeleted(true);
  };

  const projects =
    data &&
    data.projects.map((project) => {
      const _excerpt = getExcerpt(project.description, 100);

      return (
        <Project
          key={project.id}
          {...project}
          excerpt={_excerpt}
          deleteProject={handleDeleteProject}
        />
      );
    });

  return <div>{projects}</div>;
};

export default ProjectsList;
