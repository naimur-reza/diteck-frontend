/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import EnaForm from "@/components/forms/EnaForm";
import EnaInput from "@/components/forms/EnaInput";
import EnaTextArea from "@/components/forms/EnaTextArea";
import { useCreateHiringPostMutation, useUpdateHiringPostMutation } from "@/redux/api/adminApi/hiringApi/hiring.api";
import { hiringSchema } from "@/schema/hiringSchema";
import { EnaMultiInput } from "@/components/forms/EnaMultiInput";
import { EnaFileUpload, EnaSelect } from "@/components/forms";
import { THiring } from "@/types";
import { jobTypes, status } from "../_constants/constant";

const CreateUpdateHiringPost = ({ closeModal, hiring }: { closeModal: () => void, hiring?: THiring | null | undefined }) => {

    const [createHiringPost, { isLoading }] = useCreateHiringPostMutation();
    const [updateHiringPost, { isLoading: updateIsLoading }] = useUpdateHiringPostMutation();

    const handleHiring = async (data: FieldValues) => {

        try {
            const formData = new FormData();

            // Convert JSON data into a string and append it to the "data" field
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
                createdBy: "67c6c4455e0b7f4eece38bab",

                requirements: data.requirements || [],
                skillsRequired: data?.skillsRequired || [],
                benefits: data?.benefits || [],
                responsibilities: data?.responsibilities || [],
                interviewRounds: data?.interviewRounds || [],
            };

            formData.append("data", JSON.stringify(jsonData)); // ✅ Send JSON as a string

            if (data.file) {
                formData.append("file", data.file);
            }


            if (hiring?._id) {
                await updateHiringPost({ id: hiring?._id, data: formData }).unwrap();
                toast.success("Hiring Updated successfully!");
            } else {
                await createHiringPost(formData).unwrap();
                toast.success("Hiring Post created successfully!");
            }
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
                defaultValues={{
                    companyName: hiring?.companyName || "",
                    title: hiring?.title || "",
                    jobNature: hiring?.jobNature,
                    workingHours: hiring?.workingHours,
                    workingDays: hiring?.workingDays,
                    description: hiring?.description,
                    salaryRange: hiring?.salaryRange,
                    location: hiring?.location,
                    experience: hiring?.experience,
                    applicationDeadline: hiring?.applicationDeadline,
                    jobType: hiring?.jobType,
                    status: hiring?.status,
                    department: hiring?.department,
                    createdBy: "67c6c4455e0b7f4eece38bab",

                    requirements: hiring?.requirements || [],
                    skillsRequired: hiring?.skillsRequired || [],
                    benefits: hiring?.benefits || [],
                    responsibilities: hiring?.responsibilities || [],
                    interviewRounds: hiring?.interviewRounds || []
                }}>
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
                    disabled={isLoading || updateIsLoading}
                >
                    {isLoading || updateIsLoading
                        ? "Processing..."
                        : hiring?._id
                            ? "Update Job Post"
                            : "Create Job Post"
                    }
                </button>
            </EnaForm>
        </div >
    );
};

export default CreateUpdateHiringPost;

