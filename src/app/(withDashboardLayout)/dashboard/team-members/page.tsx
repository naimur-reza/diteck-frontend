"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllTeamMemberQuery } from "@/redux/api/adminApi/teamMemberApi/teamMemberApi";
import { TTeamMember } from "@/types";
import { TeamMemberFormData } from "@/types/team-member";
import { useEffect, useState } from "react";
import { AddMemberDialog } from "./_components/add-team-dialog";
import { DeleteMemberDialog } from "./_components/delete-team-member";
import { EditMemberDialog } from "./_components/edit-team-member";
import { TeamMembersTable } from "./_components/team-member-table";

export default function TeamMembers() {
  const { data: TeamMembersData, isFetching } =
    useGetAllTeamMemberQuery(undefined);
  const [members, setMembers] = useState<TTeamMember[]>(
    TeamMembersData?.data || []
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<TTeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state for add/edit
  const [formData, setFormData] = useState<TeamMemberFormData>({
    name: "",
    email: "",
    teamRole: "",
    startDate: "",
    designation: "",
    profilePhoto: "",
    address: "",
    phoneNumber: "",
    emergencyContactNumber: "",
    education: "",
  });

  // fetch all team members
  useEffect(() => {
    setMembers(TeamMembersData?.data || []);
  }, [TeamMembersData]);

  const addTeamMember = async (data: TeamMemberFormData) => {
    console.log(data);

    try {
      console.log(data);
      // const newMember = await createMember

      //   setMembers([...members, newMember]);
      // setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Failed to add team member:", error);
    }
  };

  const updateTeamMember = async () => {
    if (!currentMember) return;

    setIsLoading(true);
    try {
      //   const updatedMember = "";
      //   const updatedMembers = members.map((member) =>
      //     member.id === currentMember.id
      //     //   ? { ...member, ...updatedMember }
      //       : member
      //   );
      //   setMembers(updatedMembers);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Failed to update team member:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTeamMember = async () => {
    if (!currentMember) return;

    setIsLoading(true);
    try {
      //   await deleteMember(currentMember.id);
      const updatedMembers = members.filter(
        (member) => member._id !== currentMember._id
      );
      setMembers(updatedMembers);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete team member:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (member: TTeamMember) => {
    setCurrentMember(member);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (member: TTeamMember) => {
    setCurrentMember(member);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setCurrentMember(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
          <p className="text-muted-foreground">
            Manage your team members and their permissions.
          </p>
        </div>
        <AddMemberDialog
          isOpen={isAddDialogOpen}
          setIsOpen={setIsAddDialogOpen}
          formData={formData}
          setFormData={setFormData}
          resetForm={resetForm}
          onAdd={addTeamMember}
        />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <TeamMembersTable
            isFetching={isFetching}
            members={members}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      {/* Edit Member Dialog */}
      <EditMemberDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        member={currentMember}
        formData={formData}
        setFormData={setFormData}
        onUpdate={updateTeamMember}
        isLoading={isLoading}
        resetForm={resetForm}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteMemberDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        member={currentMember}
        onDelete={deleteTeamMember}
        isLoading={isLoading}
      />
    </div>
  );
}
