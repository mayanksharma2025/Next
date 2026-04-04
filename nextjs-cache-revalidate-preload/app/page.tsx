// app/projects/page.tsx (SERVER → CLIENT bridge)
import { getProjects } from "@/lib/db";
import OptimisticProjects from "../app/projects/OptimisticProjects";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <OptimisticProjects initialProjects={projects} />;
}
