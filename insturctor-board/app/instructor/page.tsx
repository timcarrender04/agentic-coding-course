import { loadCurriculum } from "@/lib/curriculum";
import { getState } from "@/lib/session-store";

import { InstructorCockpit } from "./cockpit";

export const dynamic = "force-dynamic";

export default function InstructorPage() {
  const modules = loadCurriculum();
  const initial = getState();

  return <InstructorCockpit initialState={initial} modules={modules} />;
}
