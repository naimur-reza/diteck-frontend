import { TTeamMember } from "./teamMember.types";

export type TeamMemberFormData = Partial<Omit<TTeamMember, "_id" | "status">>;
