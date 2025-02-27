"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamMember, TeamMemberFormData } from "@/types/team-member";
import { useEffect, useState } from "react";
import { AddMemberDialog } from "./_components/add-team-dialog";
import { DeleteMemberDialog } from "./_components/delete-team-member";
import { EditMemberDialog } from "./_components/edit-team-member";
import { TeamMembersTable } from "./_components/team-member-table";

// Mock data - replace with Redux store data
const mockTeamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Admin",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedDate: "Jan 10, 2023",
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "Designer",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedDate: "Mar 15, 2023",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Developer",
    status: "Inactive",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedDate: "Jun 22, 2023",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    role: "Marketing",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedDate: "Sep 5, 2023",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david@example.com",
    role: "Developer",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedDate: "Nov 30, 2023",
  },
];

export default function TeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state for add/edit
  const [formData, setFormData] = useState<TeamMemberFormData>({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });

  // Load team members on component mount
  useEffect(() => {
    // In a real implementation, this would fetch data from the API
    // loadTeamMembers();
  }, []);

  //   const loadTeamMembers = async () => {};

  const addTeamMember = async () => {
    setIsLoading(true);
    try {
      //   const newMember = await "";
      //   setMembers([...members, newMember]);
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Failed to add team member:", error);
    } finally {
      setIsLoading(false);
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
      resetForm();
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
        (member) => member.id !== currentMember.id
      );
      setMembers(updatedMembers);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete team member:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    // setCurrentMember(member);
    // setFormData({
    //   name: member.name,
    //   email: member.email,
    //   role: member.role,
    //   status: member.status,
    // });
    // setIsEditDialogOpen(true);
  };

  const handleDelete = (member: TeamMember) => {
    setCurrentMember(member);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "",
      status: "Active",
    });
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
          onAdd={addTeamMember}
          isLoading={isLoading}
          resetForm={resetForm}
        />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <TeamMembersTable
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
