/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import EnaForm from "@/components/forms/EnaForm";
import EnaInput from "@/components/forms/EnaInput";
import EnaTextArea from "@/components/forms/EnaTextArea";
import { useCreateHiringPostMutation } from "@/redux/api/adminApi/hiringAp/hiring.api";
import EnaMultiSelect from "@/components/forms/EnaMultiSelect";

// Validation Schema
const hiringSchema = z.object({
    companyName: z.string().min(1, "Company Name is required"),
    title: z.string().min(1, "Job Title is required"),
    hiringImage: z.string().url("Invalid image URL"),
    jobNature: z.string().min(1, "Job Nature is required"),
    workingHours: z.string().min(1, "Working Hours are required"),
    workingDays: z.string().min(1, "Working Days are required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    salaryRange: z.string().min(1, "Salary range is required"),
    location: z.string().min(1, "Location is required"),
    experience: z.string().min(1, "Experience is required"),
    applicationDeadline: z.string().min(1, "Deadline is required"),
    jobType: z.string().min(1, "Job Type is required"),
    status: z.string().min(1, "Status is required"),
    department: z.string().min(1, "Department is required"),
    skillsRequired: z.array(z.string()).min(1, "At least one skill is required"),
    benefits: z.array(z.string()).min(1, "At least one benefit is required"),
    responsibilities: z.array(z.string()).min(1, "At least one responsibility is required"),
    interviewRounds: z.array(z.string()).min(1, "At least one interview round is required"),
});

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
                    <EnaInput name="hiringImage" placeholder="Image URL" />
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
                    {/* 
                    <EnaMultiSelect control={control} name="skillsRequired" placeholder="Skills Required" options={skillsOptions} />
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
