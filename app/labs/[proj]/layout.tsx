import React from "react";
import { activeProjects } from "../../../lib/projects";

export async function generateStaticParams() {
  return activeProjects.map((project) => ({
    proj: project.name,
  }));
}

const ProjectLayout = ({ children }: { children: React.ReactNode }) => (
  <div
    className="repository-layout"
    style={{ minHeight: "100%", display: "flex", justifyContent: "center" }}
  >
    {children}
  </div>
);

export default ProjectLayout;
