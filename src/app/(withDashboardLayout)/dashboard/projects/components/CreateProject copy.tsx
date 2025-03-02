"use client";

import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import EnaForm from "@/components/forms/EnaForm";
import EnaInput from "@/components/forms/EnaInput";
import EnaTextArea from "@/components/forms/EnaTextArea";
import { useCreateProjectMutation } from "@/redux/api/adminApi/projectApi/projectApi";
import { projectSchema } from "@/schema/projectSchema";
import { EnaMultiInput } from "@/components/forms/EnaMultiInput";

const CreateProject = () => {
    const [createProject, { isLoading }] = useCreateProjectMutation();

    const handleCreateProject = async (data: FieldValues) => {
        console.log("Project Data:", data);

        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("requirement", data.requirement);
            formData.append("timeTakenToDevelop", data.timeTakenToDevelop);
            formData.append("category", data.category);
            formData.append("createdBy", "65a3f2b9d4eabc1234567892"); // Hardcoded for now

            // Generate slug from title
            const slug = data.title.toLowerCase().replace(/\s+/g, "-");
            formData.append("slug", slug);

            // Handle Thumbnail Upload
            if (data.thumbnail && data.thumbnail.length > 0) {
                formData.append("thumbnail", data.thumbnail[0]);
            }

            // Handle Multiple Images Upload
            if (data.images && data.images.length > 0) {
                data.images.forEach((image: File) => {
                    formData.append("images", image);
                });
            }

            // Append Multi-input fields as JSON
            formData.append("frontendTech", JSON.stringify(data.frontendTech || []));
            formData.append("backendTech", JSON.stringify(data.backendTech || []));
            formData.append("databases", JSON.stringify(data.databases || []));
            formData.append("deployment", JSON.stringify(data.deployment || []));
            formData.append("testing", JSON.stringify(data.testing || []));
            formData.append("websiteFeatures", JSON.stringify(data.websiteFeatures || []));
            formData.append("securityFeatures", JSON.stringify(data.securityFeatures || []));

            await createProject(formData).unwrap();
            toast.success("Project created successfully!");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Error creating project:", err);
            toast.error(err?.data?.message || "Failed to create project.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <EnaForm
                onSubmit={handleCreateProject}
                // schema={projectSchema}
                defaultValues={{
                    title: "",
                    description: "",
                    frontendTech: [],
                    backendTech: [],
                    databases: [],
                    deployment: [],
                    testing: [],
                    requirement: "",
                    timeTakenToDevelop: "",
                    websiteFeatures: [],
                    securityFeatures: [],
                    category: "",
                    slug: "",
                    createdBy: "",
                }}
            >
                <div className="grid grid-cols-2 gap-5 mb-5">
                    <EnaInput name="title" placeholder="Project Title" />
                    <EnaInput name="category" placeholder="Category" />
                    <EnaTextArea name="description" placeholder="Project Description" />
                    <EnaTextArea name="requirement" placeholder="Project Requirements" />
                    <EnaInput name="timeTakenToDevelop" placeholder="Time Taken to Develop" />

                    {/* Multi-input fields using EnaMultiInput */}
                    <EnaMultiInput name="frontendTech" label="Frontend Technologies" />
                    <EnaMultiInput name="backendTech" label="Backend Technologies" />
                    <EnaMultiInput name="databases" label="Databases" />
                    <EnaMultiInput name="deployment" label="Deployment Methods" />
                    <EnaMultiInput name="testing" label="Testing Tools" />
                    <EnaMultiInput name="websiteFeatures" label="Website Features" />
                    <EnaMultiInput name="securityFeatures" label="Security Features" />

                    {/* Thumbnail Upload */}
                    <EnaInput name="thumbnail" placeholder="Upload Thumbnail" type="file" />

                    {/* Multiple Image Upload */}
                    <EnaInput name="images" placeholder="Upload Images" type="file" multiple />
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-hover cursor-pointer"
                    disabled={isLoading}
                >
                    {isLoading ? "Creating..." : "Create Project"}
                </button>
            </EnaForm>
        </div>
    );
};

export default CreateProject;
