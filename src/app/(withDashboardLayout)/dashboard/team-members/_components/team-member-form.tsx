"use client";

import {
  EnaFileUpload,
  EnaForm,
  EnaInput,
  EnaSelect,
} from "@/components/forms";
import {
  teamMemberSchema,
  updateTeamMemberSchema,
} from "@/schema/teamMemberSchema";
import { TTeamMember } from "@/types";
import { TeamMemberFormData } from "@/types/team-member";
import { useEffect } from "react";
import { FieldValues } from "react-hook-form";

interface TeamMemberFormProps {
  formData: TeamMemberFormData;
  setFormData: (data: TeamMemberFormData) => void;
  member?: TTeamMember | null;
  onSubmit: (data: FieldValues) => void;
  isLoading: boolean;
}

export function TeamMemberForm({
  setFormData,
  member,
  onSubmit,
  isLoading,
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
      defaultValues={
        member
          ? {
              name: member.name || "",
              email: member.email || "",
              phoneNumber: member.phoneNumber || "",
              emergencyContactNumber: member.emergencyContactNumber || "",
              address: member.address || "",
              teamRole: member.teamRole || "",
              designation: member.designation || "",
              startDate: member.startDate || "",
            }
          : {}
      }
      schema={member ? updateTeamMemberSchema : teamMemberSchema}
      buttonPosition="right"
      buttonText={member ? "Update" : "Add"}
      isLoading={isLoading}
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
          placeholder="01712345678"
        />

        <EnaInput
          name="emergencyContactNumber"
          label="Emergency Phone no."
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
          type="date"
          label="Start Date"
          placeholder="2021-01-01"
        />

        <div className="col-span-2">
          <EnaFileUpload label="Photo" name="profilePhoto" accept="image/*" />
        </div>
      </div>
    </EnaForm>
  );
}

export const roles = [
  {
    label: "Manager",
    value: "manager",
  },
  {
    label: "Frontend Developer",
    value: "frontEndDeveloper",
  },
  {
    label: "Backend Developer",
    value: "backEndDeveloper",
  },
  {
    label: "UI/UX Designer",
    value: "uiuxDesigner",
  },
];
