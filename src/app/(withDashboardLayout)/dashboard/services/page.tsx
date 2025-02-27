import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">Manage your services.</p>
        </div>
        {/* <AddMemberDialog
      isOpen={isAddDialogOpen}
      setIsOpen={setIsAddDialogOpen}
      formData={formData}
      setFormData={setFormData}
      onAdd={addTeamMember}
      isLoading={isLoading}
      resetForm={resetForm}
    /> */}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Services</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <TeamMembersTable
        members={members}
        onEdit={handleEdit}
        onDelete={handleDelete}
      /> */}
        </CardContent>
      </Card>

      {/* Edit Member Dialog */}
      {/* <EditMemberDialog
    isOpen={isEditDialogOpen}
    setIsOpen={setIsEditDialogOpen}
    member={currentMember}
    formData={formData}
    setFormData={setFormData}
    onUpdate={updateTeamMember}
    isLoading={isLoading}
    resetForm={resetForm}
  /> */}

      {/* Delete Confirmation Dialog */}
      {/* <DeleteMemberDialog
    isOpen={isDeleteDialogOpen}
    setIsOpen={setIsDeleteDialogOpen}
    member={currentMember}
    onDelete={deleteTeamMember}
    isLoading={isLoading}
  /> */}
    </div>
  );
};

export default Services;
