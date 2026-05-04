import { redirect } from "next/navigation";

import { getCurrentStudent } from "@/lib/auth";
import { loadCurriculum } from "@/lib/curriculum";
import { getState } from "@/lib/session-store";

import { StudentView } from "./view";

export const dynamic = "force-dynamic";

export default async function StudentPage() {
  const student = await getCurrentStudent();

  if (!student) redirect("/login");

  const modules = loadCurriculum();
  const initial = getState();

  return <StudentView initialState={initial} modules={modules} />;
}
