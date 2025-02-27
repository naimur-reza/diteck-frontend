/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import EnaForm from "@/components/forms/EnaForm";
import EnaInput from "@/components/forms/EnaInput";
import EnaTextArea from "@/components/forms/EnaTextArea";
import EnaMultiSelect from "@/components/forms/EnaMultiSelect";
import { useCreateHiringPostMutation } from "@/redux/api/adminApi/hiringApi/hiring.api";
import { hiringSchema } from "@/schema/hiring";

const CreateHiringPost = () => {

    const [createHiringPost, { isLoading }] = useCreateHiringPostMutation();

    const { control } = useForm({ defaultValues: { skills: [] }, });

    const skillsOptions = [
        { label: "JavaScript", value: "javascript" },
        { label: "React", value: "react" },
        { label: "Node.js", value: "node" },
        { label: "TypeScript", value: "typescript" },
    ];

    const handleHiring = async (data: FieldValues) => {
        console.log(data);
        // try {
        //     const newPost = {
        //         ...data,
        //         createdBy: "64c8f43b4b5a7b001f3a6e5d", // Hardcoded for now; should be dynamic
        //         slug: data.title.toLowerCase().replace(/ /g, "-"),
        //     };

        //     await createHiringPost(newPost).unwrap();
        //     toast.success("Job post created successfully!");

        // } catch (err: any) {
        //     console.error("Error creating job post:", err);
        //     toast.error(err?.data?.message || "Failed to create job post.");
        // }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">

            <EnaForm onSubmit={handleHiring} schema={hiringSchema} defaultValues={{ companyName: "", title: "" }}>
                <div className="grid grid-cols-2 gap-5 mb-5">
                    <EnaInput name="companyName" placeholder="Company Name" />
                    <EnaInput name="title" placeholder="Job Title" />
                    <EnaInput name="hiringImage" placeholder="Image URL" type="file" />
                    <EnaInput name="jobNature" placeholder="Job Nature (e.g., Remote, On-Site)" />
                    <EnaInput name="workingHours" placeholder="Working Hours" />
                    <EnaInput name="workingDays" placeholder="Working Days" />
                    <EnaTextArea name="description" placeholder="Job Description" />
                    <EnaInput name="salaryRange" placeholder="Salary Range (e.g., 70000 - 90000)" />
                    <EnaInput name="location" placeholder="Job Location" />
                    <EnaInput name="experience" placeholder="Required Experience" />
                    <EnaInput name="applicationDeadline" type="date" placeholder="Application Deadline" />
                    <EnaInput name="jobType" placeholder="Job Type (e.g., Full-time, Part-time)" />
                    <EnaInput name="status" placeholder="Status (e.g., Active, Inactive)" />
                    <EnaInput name="department" placeholder="Department" />

                    {/* <EnaMultiSelect control={control} name="skillsRequired" placeholder="Skills Required" options={skillsOptions} />
                    <EnaMultiSelect control={control} name="benefits" placeholder="Benefits Offered" options={skillsOptions} />
                    <EnaMultiSelect control={control} name="responsibilities" placeholder="Job Responsibilities" options={skillsOptions} />
                    <EnaMultiSelect control={control} name="interviewRounds" placeholder="Interview Rounds" options={skillsOptions} /> */}
                </div>

                <button
                    type="submit"

                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-hover cursor-pointer"
                    disabled={isLoading}
                >
                    {isLoading ? "Creating..." : "Create Job Post"}
                </button>
            </EnaForm>
        </div>
    );
};

export default CreateHiringPost;
