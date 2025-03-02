"use client";

import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import EnaForm from "@/components/forms/EnaForm";
import EnaInput from "@/components/forms/EnaInput";
import EnaTextArea from "@/components/forms/EnaTextArea";
import { useCreateProjectMutation } from "@/redux/api/adminApi/projectApi/projectApi";
import { projectSchema } from "@/schema/projectSchema";
import EnaMultiInput2 from "@/components/forms/EnaMultiInput2";

const CreateProject = () => {
    const [createProject, { isLoading }] = useCreateProjectMutation();

    // Multi-input fields state
    const [frontendTech, setFrontendTech] = useState<string[]>([]);
    const [backendTech, setBackendTech] = useState<string[]>([]);
    const [databases, setDatabases] = useState<string[]>([]);
    const [deployment, setDeployment] = useState<string[]>([]);
    const [testing, setTesting] = useState<string[]>([]);
    const [websiteFeatures, setWebsiteFeatures] = useState<string[]>([]);
    const [securityFeatures, setSecurityFeatures] = useState<string[]>([]);

    // Images state
    const [images, setImages] = useState<File[]>([]);

    const handleCreateProject = async (data: FieldValues) => {
        console.log("Project Data:", data);

        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("requirement", data.requirement);
            formData.append("timeTakenToDevelop", data.timeTakenToDevelop);
            formData.append("category", data.category);
            formData.append("author", "65a3f2b9d4eabc1234567892"); // Hardcoded for now

            // Handle Thumbnail Upload
            if (data.thumbnail && data.thumbnail.length > 0) {
                formData.append("thumbnail", data.thumbnail[0]); // Get first file
            }

            // Handle Multiple Images Upload
            if (images.length > 0) {
                images.forEach((image) => {
                    formData.append("images", image); // Append each image file to 'images'
                });
            }

            // Append Multi-input fields as actual arrays
            frontendTech.forEach((tech) => formData.append("frontendTech[]", tech));
            backendTech.forEach((tech) => formData.append("backendTech[]", tech));
            databases.forEach((db) => formData.append("databases[]", db));
            deployment.forEach((deploy) => formData.append("deployment[]", deploy));
            testing.forEach((test) => formData.append("testing[]", test));
            websiteFeatures.forEach((feature) => formData.append("websiteFeatures[]", feature));
            securityFeatures.forEach((feature) => formData.append("securityFeatures[]", feature));

            await createProject(formData).unwrap();
            toast.success("Project created successfully!");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Error creating project:", err);
            toast.error(err?.data?.message || "Failed to create project.");
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newImages = Array.from(event.target.files);
            setImages((prevImages) => [...prevImages, ...newImages]); // Add new images to the state
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <EnaForm onSubmit={handleCreateProject} schema={projectSchema} defaultValues={{
                title: "", description: "", frontendTech: [], backendTech: [], databases: [],
                deployment: [], testing: [], requirement: "", timeTakenToDevelop: "",
                websiteFeatures: [], securityFeatures: [], category: "", slug: "",
                author: ""
            }}>
                <div className="grid grid-cols-2 gap-5 mb-5">
                    <EnaInput name="title" placeholder="Project Title" />
                    <EnaInput name="category" placeholder="Category" />
                    <EnaTextArea name="description" placeholder="Project Description" />
                    <EnaTextArea name="requirement" placeholder="Project Requirements" />
                    <EnaInput name="timeTakenToDevelop" placeholder="Time Taken to Develop" />

                    {/* Multi-input fields for technologies, deployment, etc. */}
                    <EnaMultiInput2 label="Frontend Technologies" placeholder="Add frontend technologies..." onChange={setFrontendTech} />
                    <EnaMultiInput2 label="Backend Technologies" placeholder="Add backend technologies..." onChange={setBackendTech} />
                    <EnaMultiInput2 label="Databases" placeholder="Add databases..." onChange={setDatabases} />
                    <EnaMultiInput2 label="Deployment Methods" placeholder="Add deployment methods..." onChange={setDeployment} />
                    <EnaMultiInput2 label="Testing Tools" placeholder="Add testing tools..." onChange={setTesting} />
                    <EnaMultiInput2 label="Website Features" placeholder="Add website features..." onChange={setWebsiteFeatures} />
                    <EnaMultiInput2 label="Security Features" placeholder="Add security features..." onChange={setSecurityFeatures} />

                    {/* Thumbnail upload */}
                    <EnaInput name="thumbnail" placeholder="Upload Thumbnail" type="file" />

                    {/* Multiple Image Upload */}
                    <EnaInput name="images" placeholder="Upload Images" type="file" multiple onChange={handleImageChange} />
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
