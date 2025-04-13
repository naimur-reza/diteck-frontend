"use client";

import ErrorMessage from "@/components/dashboard/ErrorMessage/ErrorMessage";
import EnaForm from "@/components/forms/EnaForm";
import EnaInput from "@/components/forms/EnaInput";
import { EnaMultiInput } from "@/components/forms/EnaMultiInput";
import EnaTextArea from "@/components/forms/EnaTextArea";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "@/redux/api/adminApi/projectApi/projectApi";
import { useAppSelector } from "@/redux/hooks";
import { projectSchema } from "@/schema/projectSchema";
import { TError, TProject } from "@/types";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const CreateUpdateProject = ({
  closeModal,
  project,
}: {
  closeModal: () => void;
  project?: TProject | null | undefined;
}) => {
  const { user } = useAppSelector((state) => state.auth);

  const [createProject, { isLoading, error: createError }] =
    useCreateProjectMutation();
  const [updateProject, { isLoading: updateIsLoading, error: updateError }] =
    useUpdateProjectMutation();

  const error = createError || updateError;
  const loading = isLoading || updateIsLoading;

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);

  const handleCreateProject = async (data: FieldValues) => {
    try {
      const formData = new FormData();

      const jsonData = {
        title: data.title,
        description: data.description,
        timeTakenToDevelop: data.timeTakenToDevelop,
        category: data.category,
        createdBy: user?._id,
        frontendTech: data?.frontendTech || [],
        backendTech: data?.backendTech || [],
        databases: data?.databases || [],
        websiteFeatures: data?.websiteFeatures || [],
        securityFeatures: data?.securityFeatures || [],
      };

      formData.append("data", JSON.stringify(jsonData));

      // Append the thumbnail file
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      // Append multiple images
      if (images?.length) {
        images.forEach((file) => {
          formData.append("images", file);
        });
      }

      if (project?._id) {
        await updateProject({ id: project?._id, data: formData }).unwrap();
        toast.success("Project Updated successfully!");
      } else {
        await createProject(formData).unwrap();
        toast.success("Project created successfully!");
      }

      setThumbnail(null);
      setImages([]);
      closeModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error creating project:", err);
      toast.error(err?.data?.message || "Failed to create project.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-2 bg-white shadow-lg rounded-lg">
      <EnaForm
        defaultValues={{
          title: project?.title,
          description: project?.description,
          timeTakenToDevelop: project?.timeTakenToDevelop,
          category: project?.category,
          createdBy: user?._id,
          frontendTech: project?.frontendTech || [],
          backendTech: project?.backendTech || [],
          databases: project?.databases || [],
          websiteFeatures: project?.websiteFeatures || [],
          securityFeatures: project?.securityFeatures || [],
        }}
        onSubmit={handleCreateProject}
        schema={projectSchema}
      >
        <div className="grid grid-cols-2 gap-5 mb-5">
          <EnaInput
            name="title"
            label="Project Title"
            placeholder="Enter title"
          />
          <EnaInput
            name="category"
            label="Category"
            placeholder="Enter category"
          />
          <div className="col-span-2">
            <EnaTextArea
              name="description"
              label="Project Description"
              placeholder="Enter description"
            />
          </div>
          <EnaInput
            name="timeTakenToDevelop"
            label="Development Time"
            placeholder="e.g., 3-6 weeks"
          />

          {/* Multi-input fields */}
          <EnaMultiInput
            label="Frontend Technologies"
            helperText="Add frontend frameworks"
            name="frontendTech"
            placeholder="Enter frontend tech"
          />
          <EnaMultiInput
            label="Backend Technologies"
            helperText="Add backend frameworks"
            name="backendTech"
            placeholder="Enter backend tech"
          />
          <EnaMultiInput
            label="Databases"
            helperText="List databases used"
            name="databases"
            placeholder="Enter database"
          />
          <EnaMultiInput
            label="Website Features"
            helperText="List website features"
            name="websiteFeatures"
            placeholder="Enter website feature"
          />
          <EnaMultiInput
            label="Security Features"
            helperText="List security features"
            name="securityFeatures"
            placeholder="Enter security feature"
          />

          {/* Image Upload Fields */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Thumbnail
            </label>
            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Project Images
            </label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={(e) => setImages(Array.from(e.target.files || []))}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </div>
        {/* Show error messages */}
        {!loading && <ErrorMessage error={error as TError} />}

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-hover cursor-pointer"
          disabled={isLoading || updateIsLoading}
        >
          {isLoading || updateIsLoading
            ? "Processing..."
            : project?._id
            ? "Update Project"
            : "Create Project"}
        </button>
      </EnaForm>
    </div>
  );
};

export default CreateUpdateProject;
