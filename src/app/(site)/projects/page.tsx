import { redirect } from "next/navigation";

/** The project index lives at /all (Porto Rocha's "Show all projects"). */
export default function ProjectsIndex() {
  redirect("/all");
}
