"use client";

import { EnaForm, EnaInput, EnaSelect } from "@/components/forms";
import { teamMemberSchema } from "@/schema/teamMemberSchema";
import { TTeamMember } from "@/types";
import { TeamMemberFormData } from "@/types/team-member";
import { useEffect } from "react";
import { FieldValues } from "react-hook-form";

interface TeamMemberFormProps {
  formData: TeamMemberFormData;
  setFormData: (data: TeamMemberFormData) => void;
  member?: TTeamMember | null;
  onSubmit: (data: FieldValues) => void;
}

export function TeamMemberForm({
  setFormData,
  member,
  onSubmit,
}: TeamMemberFormProps) {
  // Initialize form with member data if editing
  useEffect(() => {
    if (member) {
      setFormData(member);
    }
  }, [member, setFormData]);

  return (
    <EnaForm
      onSubmit={onSubmit}
      defaultValues={member ?? {}}
      schema={teamMemberSchema}
      buttonPosition="right"
      buttonText="Add Member"
    >
      <div className="grid grid-cols-2 gap-3">
        <EnaInput label="Name" name="name" placeholder="John Doe" />
        <EnaInput
          label="Email"
          name="email"
          type="email"
          placeholder="john@example.com"
        />
        <EnaInput
          label="Phone no."
          name="phoneNumber"
          type="number"
          placeholder="01712345678"
        />

        <EnaInput
          name="emergencyContactNumber"
          label="Emergency Phone no."
          type="number"
          placeholder="01712345678"
        />

        <EnaInput
          label="Address"
          name="address"
          placeholder="Block C, Dhanmondi, Dhaka"
        />

        <EnaSelect label="Select role" name="teamRole" options={roles} />

        <EnaInput
          name="designation"
          label="Designation"
          placeholder="Software Engineer"
        />

        <EnaInput
          name="startDate"
          label="Start Date"
          type="date"
          placeholder="2021-01-01"
        />

        <EnaInput name="thumbnail" placeholder="Upload Thumbnail" type="file" />
      </div>
    </EnaForm>
  );
}

const roles = [
  {
    label: "Manager",
    value: "manager",
  },
  {
    label: "Frontend Developer",
    value: "frontendDeveloper",
  },
  {
    label: "Backend Developer",
    value: "backendDeveloper",
  },
  {
    label: "UI/UX Designer",
    value: "uiuxDesigner",
  },
];
