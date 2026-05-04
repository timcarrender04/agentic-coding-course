import { loadCurriculum } from "@/lib/curriculum";
import { getState } from "@/lib/session-store";

import { StudentView } from "./view";

export const dynamic = "force-dynamic";

export default function StudentPage() {
  const modules = loadCurriculum();
  const initial = getState();

  return <StudentView initialState={initial} modules={modules} />;
}
