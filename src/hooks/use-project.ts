"use client"
import { api } from "@/trpc/react";
import { useLocalStorage } from "usehooks-ts";

const useProject = () => {
  const { data: projects,isLoading } = api.project.getProjects.useQuery();
  const [projectId, setProjectId] = useLocalStorage("praxis-project-id", " ");
  const project = projects?.find((project) => project.id === projectId);

  return {
    projects,
    project,
    projectId,
    setProjectId,
    isLoading
  };
};

export default useProject;
