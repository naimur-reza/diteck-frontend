export interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string;
  joinedDate: string;
}

export interface TeamMemberFormData {
  name: string;
  email: string;
  role: string;
  status: string;
}
