"use client";

import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import EnaForm from "@/components/forms/EnaForm";
import EnaInput from "@/components/forms/EnaInput";
import EnaTextArea from "@/components/forms/EnaTextArea";
import EnaFileUpload from "@/components/forms/EnaFileUpload";
import { useCreateProjectMutation } from "@/redux/api/adminApi/projectApi/projectApi";
import { projectSchema } from "@/schema/projectSchema";
import { EnaMultiInput } from "@/components/forms/EnaMultiInput";

const CreateProject = () => {
    const [createProject, { isLoading }] = useCreateProjectMutation();

    const handleCreateProject = async (data: FieldValues) => {
        console.log("Project Data:", data);

        try {
            const formData = new FormData();

            // Convert JSON data into a string and append it to the "data" field
            const jsonData = {
                title: data.title,
                description: data.description,
                requirement: data.requirement,
                timeTakenToDevelop: data.timeTakenToDevelop,
                category: data.category,
                createdBy: "65a3f2b9d4eabc1234567892",
                frontendTech: data?.frontendTech || [],
                backendTech: data?.backendTech || [],
                databases: data?.databases || [],
                deployment: data?.deployment || [],
                testing: data?.testing || [],
                websiteFeatures: data?.websiteFeatures || [],
                securityFeatures: data?.securityFeatures || [],
            };

            console.log('json ', JSON.stringify(jsonData));
            console.log("Thumbnail Data:", data.thumbnail);


            formData.append("data", JSON.stringify(jsonData)); // ✅ Send JSON as a string
            formData.append("thumbnail", data.thumbnail); // ✅ Append directly if it's a single 

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
                schema={projectSchema}
                defaultValues={{
                    title: "",
                    description: "",
                    requirement: "",
                    timeTakenToDevelop: "",
                    category: "",
                }}
                onSubmit={handleCreateProject}
            >
                <div className="grid grid-cols-2 gap-5 mb-5">
                    <EnaInput name="title" label="Project Title" placeholder="Enter title" />
                    <EnaInput name="category" label="Category" placeholder="Enter category" />
                    <EnaTextArea name="description" label="Project Description" placeholder="Enter description" />
                    <EnaTextArea name="requirement" label="Project Requirements" placeholder="Enter requirements" />
                    <EnaInput name="timeTakenToDevelop" label="Development Time" placeholder="e.g., 3-6 weeks" />

                    {/* Multi-input fields */}
                    <EnaMultiInput label="Frontend Technologies" helperText="Add frontend frameworks" name="frontendTech" placeholder="Enter frontend tech" />
                    <EnaMultiInput label="Backend Technologies" helperText="Add backend frameworks" name="backendTech" placeholder="Enter backend tech" />
                    <EnaMultiInput label="Databases" helperText="List databases used" name="databases" placeholder="Enter database" />
                    <EnaMultiInput label="Deployment Methods" helperText="List deployment methods" name="deployment" placeholder="Enter deployment method" />
                    <EnaMultiInput label="Testing Tools" helperText="List testing tools used" name="testing" placeholder="Enter testing tool" />
                    <EnaMultiInput label="Website Features" helperText="List website features" name="websiteFeatures" placeholder="Enter website feature" />
                    <EnaMultiInput label="Security Features" helperText="List security features" name="securityFeatures" placeholder="Enter security feature" />

                    {/* Image Upload Fields */}
                    <div className="col-span-2">
                        <EnaFileUpload label="Thumbnail" name="thumbnail" accept="image/*" />
                    </div>

                    {/* <div className="col-span-2">
                        <EnaFileUpload label="Project Images" name="images" accept="image/*" multiple />
                    </div> */}
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
