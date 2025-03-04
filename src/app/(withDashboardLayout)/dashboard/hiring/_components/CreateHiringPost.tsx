/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import EnaForm from "@/components/forms/EnaForm";
import EnaInput from "@/components/forms/EnaInput";
import EnaTextArea from "@/components/forms/EnaTextArea";
import { useCreateHiringPostMutation } from "@/redux/api/adminApi/hiringApi/hiring.api";
import { hiringSchema } from "@/schema/hiringSchema";
import { EnaMultiInput } from "@/components/forms/EnaMultiInput";
import { EnaFileUpload, EnaSelect } from "@/components/forms";

const CreateHiringPost = ({ closeModal }: { closeModal: () => void }) => {

    const [createHiringPost, { isLoading }] = useCreateHiringPostMutation();

    const handleHiring = async (data: FieldValues) => {

        try {
            const formData = new FormData();

            const jsonData = {
                companyName: data.companyName,
                title: data.title,
                jobNature: data.jobNature,
                workingHours: data.workingHours,
                workingDays: data.workingDays,
                description: data.description,
                salaryRange: data.salaryRange,
                location: data.location,
                experience: data.experience,
                applicationDeadline: data.applicationDeadline,
                jobType: data.jobType,
                status: data.status,
                department: data.department,
                createdBy: "67c0129af2550046d53c104b",

                requirements: data.requirements || [],
                skillsRequired: data?.skillsRequired || [],
                benefits: data?.benefits || [],
                responsibilities: data?.responsibilities || [],
                interviewRounds: data?.interviewRounds || [],
            };

            formData.append("data", JSON.stringify(jsonData)); 
            formData.append("file", data.file);

            await createHiringPost(formData).unwrap();
            toast.success("Hiring Post created successfully!");
            closeModal();
        } catch (err: any) {
            console.error("Error creating blog:", err);
            toast.error(err?.data?.message || "Failed to create Hiring Post.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">

            <EnaForm onSubmit={handleHiring}
                schema={hiringSchema} 
                defaultValues={{ companyName: "", title: "" }}>
                <div className="grid grid-cols-2 gap-5 mb-5">
                    <EnaInput label="Company Name" name="companyName" placeholder="Company Name" />
                    <EnaInput label="Job Title" name="title" placeholder="Job Title" />

                    <EnaInput label="Job Nature" name="jobNature" placeholder="Job Nature (e.g., Remote, On-Site)" />
                    <EnaInput label="Working Hours" name="workingHours" placeholder="Working Hours" />
                    <EnaInput label="Working Days" name="workingDays" placeholder="Working Days" />
                    <EnaInput label="Salary RangeSalary Range" name="salaryRange" placeholder="Salary Range (e.g., 5000 - 10000)" />
                    <EnaInput label="Job Location" name="location" placeholder="Job Location" />
                    <EnaInput label="Experience" name="experience" placeholder="Required Experience" />
                    <EnaInput label="Application Deadline" name="applicationDeadline" type="date" placeholder="Application Deadline" />
                    <EnaSelect label="Job Type" options={jobTypes} name="jobType" placeholder="Job Type (full-time, part-time, remote, hybrid)" />
                    <EnaSelect label="Status" options={status} name="status" placeholder="Status (active, inactive, expired)" />
                    <EnaInput label="Department" name="department" placeholder="Department" />
                    <EnaTextArea label="Job Description" name="description" placeholder="Job Description" />

                    <EnaMultiInput
                        name="requirements"
                        placeholder="Requirements Required"
                        label="Requirements Required"
                        helperText="List of Requirements"
                    />
                    <EnaMultiInput
                        name="skillsRequired"
                        placeholder="Skills Required"
                        label="Skills Required"
                        helperText="List of Skills"
                    />
                    <EnaMultiInput
                        name="benefits"
                        placeholder="Benefits Offered"
                        label="Benefits Offered"
                        helperText="List of Benefits"
                    />
                    <EnaMultiInput
                        name="responsibilities"
                        placeholder="Job Responsibilities"
                        label="Job Responsibilities"
                        helperText="List of Job Responsibilities"
                    />
                    <EnaMultiInput
                        name="interviewRounds"
                        placeholder="Interview Rounds"
                        label="Interview Rounds"
                        helperText="List Interview Rounds"
                    />
                    <div className="col-span-2">
                        <EnaFileUpload
                            label="Thumbnail"
                            name="file"
                            accept="image/*"
                        />
                    </div>
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

const jobTypes = [
    { value: "full-time", label: "Full-Time" },
    { value: "part-time", label: "Part-Time" },
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
];
const status = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "expired", label: "Expired" },
];