"use client";

import { EnaForm, EnaInput, EnaSelect } from "@/components/forms";
import { TeamMember, TeamMemberFormData } from "@/types/team-member";
import { useEffect } from "react";

interface TeamMemberFormProps {
  formData: TeamMemberFormData;
  setFormData: (data: TeamMemberFormData) => void;
  member?: TeamMember | null;
}

export function TeamMemberForm({ setFormData, member }: TeamMemberFormProps) {
  // Initialize form with member data if editing
  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        email: member.email,
        role: member.role,
        status: member.status,
      });
    }
  }, [member, setFormData]);

  return (
    <EnaForm onSubmit={(data) => console.log(data)}>
      <div className="grid grid-cols-2 gap-3">
        <EnaInput
          label="Name"
          name="name"
          //   value={formData.name}
          placeholder="John Doe"
        />
        <EnaInput
          label="Email"
          name="email"
          type="email"
          //   value={formData.email}
          placeholder="john@example.com"
        />
        <EnaInput
          label="Phone no."
          name="phoneNumber"
          type="number"
          //   value={formData.email}
          placeholder="01712345678"
        />
        <EnaInput
          label="Address"
          name="address"
          //   value={formData.email}
          placeholder="Block C, Dhanmondi, Dhaka"
        />
        <EnaInput
          label="Education"
          name="education"
          //   value={formData.email}
          placeholder="Bachelor of Science"
        />
        <EnaSelect
          label="Select role"
          name="role"
          options={[
            {
              label: "Admin",
              value: "Admin",
            },
            {
              label: "Frontend Developer",
              value: "Frontend Developer",
            },
            {
              label: "Backend Developer",
              value: "Backend Developer",
            },
            {
              label: "UI/UX Designer",
              value: "Designer",
            },
          ]}
        />
      </div>
    </EnaForm>
  );
}
