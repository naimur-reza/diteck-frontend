"use client";

import { Card, CardContent } from "@/components/ui/card";
import Modal from "@/components/ui/modal/Modal";
import { useModal } from "@/hooks/useModal";
import {
  useCreateTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useGetAllTeamMemberQuery,
  useUpdateTeamMemberMutation,
} from "@/redux/api/adminApi/teamMemberApi/teamMemberApi";
import { TTeamMember } from "@/types";
import { TeamMemberFormData } from "@/types/team-member";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { AddMemberDialog } from "./_components/add-team-dialog";
import { DeleteMemberDialog } from "./_components/delete-team-member";
import { EditMemberDialog } from "./_components/edit-team-member";
import { TeamMembersTable } from "./_components/team-member-table";
import ViewMember from "./_components/ViewMember";

export default function TeamMembers() {
  const [_pageNumber] = useState(1);
  const [_searchTerm] = useState("");
  const [_limit] = useState(50);

  // redux hooks
  const { data: members, isFetching } = useGetAllTeamMemberQuery([
    { name: "searchTerm", value: _searchTerm },
    { name: "isDeleted", value: false },
    { name: "limit", value: _limit },
    { name: "page", value: _pageNumber },
  ]);

  const [createMember, { isLoading: isCreating }] =
    useCreateTeamMemberMutation();

  const [deleteMember] = useDeleteTeamMemberMutation();
  const [updateMember] = useUpdateTeamMemberMutation();

  // states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<TTeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    isOpen: ViewIsOpen,
    openModal: viewOpenModal,
    closeModal: viewCloseModal,
  } = useModal();

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

  const addTeamMember = async (data: FieldValues) => {
    const { profilePhoto, ...restData } = data;

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(restData));
      formData.append("file", profilePhoto);
      const { data: newMember } = await createMember(formData).unwrap();
      setIsAddDialogOpen(false);
      toast.success("Team member added successfully");

      console.log("New Member:", newMember);
    } catch (error) {
      console.error("Failed to add team member:", error);
    }
  };

  const updateTeamMember = async (data: FieldValues) => {
    if (!currentMember) return;

    const { profilePhoto, ...restData } = data;

    const formData = new FormData();
    formData.append("data", JSON.stringify(restData));

    if (profilePhoto) {
      formData.append("file", profilePhoto);
    }

    setIsLoading(true);
    try {
      await updateMember({
        data: formData,
        id: currentMember._id,
      });

      setIsEditDialogOpen(false);
      toast.success("Team member updated successfully");
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
      await deleteMember({ id: currentMember._id });
      setIsDeleteDialogOpen(false);
      toast.success("Team member deleted successfully");
    } catch (error) {
      console.error("Failed to delete team member:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // handle view modal
  const handleViewModal = (member: TTeamMember) => {
    viewOpenModal();
    setCurrentMember(member);
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
          isLoading={isCreating}
        />
      </div>

      <Card>
        <CardContent>
          <TeamMembersTable
            isFetching={isFetching}
            members={members?.data ?? []}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleViewModal}
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
      />

      {/* Delete Confirmation Dialog */}
      <DeleteMemberDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        member={currentMember}
        onDelete={deleteTeamMember}
        isLoading={isLoading}
      />

      {/* View Team Member Details */}
      <Modal
        isOpen={ViewIsOpen}
        onClose={viewCloseModal}
        title="Team Member Details"
      >
        <ViewMember member={currentMember} />
      </Modal>
    </div>
  );
}
