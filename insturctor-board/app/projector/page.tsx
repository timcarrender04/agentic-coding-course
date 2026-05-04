import { loadCurriculum } from "@/lib/curriculum";
import { getState } from "@/lib/session-store";

import { ProjectorView } from "./view";

export const dynamic = "force-dynamic";

export default function ProjectorPage() {
  const modules = loadCurriculum();
  const initial = getState();

  return <ProjectorView initialState={initial} modules={modules} />;
}
