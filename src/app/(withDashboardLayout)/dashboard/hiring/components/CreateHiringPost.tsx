"use client";

import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import EnaForm from "@/components/forms/EnaForm";
import EnaInput from "@/components/forms/EnaInput";
import EnaTextArea from "@/components/forms/EnaTextArea";
import { useCreateHiringPostMutation } from "@/redux/api/adminApi/hiringApi/hiring.api";
import { hiringSchema } from "@/schema/hiringSchema";
import EnaMultiInput2 from "@/components/forms/EnaMultiInput2";

const CreateHiringPost = () => {
    const [createHiringPost, { isLoading }] = useCreateHiringPostMutation();

    // Multi-input fields state
    const [skillsRequired, setSkillsRequired] = useState<string[]>([]);
    const [benefits, setBenefits] = useState<string[]>([]);
    const [responsibilities, setResponsibilities] = useState<string[]>([]);
    const [interviewRounds, setInterviewRounds] = useState<string[]>([]);
    const [requirements, setRequirements] = useState<string[]>([]);

    const handleHiring = async (data: FieldValues) => {
        console.log("Form Data:", data);

        // Validate salary format
        const salaryRegex = /^\d{4,6} - \d{4,6}$/;
        if (!salaryRegex.test(data.salaryRange)) {
            toast.error("Salary range must be in the format '5000 - 10000'.");
            return;
        }

        // Validate jobType and status enums
        const validJobTypes = ["full-time", "part-time", "remote", "hybrid"];
        const validStatuses = ["active", "inactive", "expired"];

        if (!validJobTypes.includes(data.jobType)) {
            toast.error(`Invalid job type. Expected one of ${validJobTypes.join(", ")}`);
            return;
        }

        if (!validStatuses.includes(data.status)) {
            toast.error(`Invalid status. Expected one of ${validStatuses.join(", ")}`);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("companyName", data.companyName);
            formData.append("title", data.title);
            formData.append("jobNature", data.jobNature);
            formData.append("workingHours", data.workingHours);
            formData.append("workingDays", data.workingDays);
            formData.append("description", data.description);
            formData.append("salaryRange", data.salaryRange);
            formData.append("location", data.location);
            formData.append("experience", data.experience);
            formData.append("applicationDeadline", data.applicationDeadline);
            formData.append("jobType", data.jobType);
            formData.append("status", data.status);
            formData.append("department", data.department);
            formData.append("createdBy", "67c0129af2550046d53c104b"); // Hardcoded for now

            // Append Multi-input fields as actual arrays, NOT JSON strings
            skillsRequired.forEach(skill => formData.append("skillsRequired[]", skill))
            benefits.forEach(benefit => formData.append("benefits[]", benefit))
            responsibilities.forEach(resp => formData.append("responsibilities[]", resp));
            interviewRounds.forEach(round => formData.append("interviewRounds[]", round));
            requirements.forEach(requirement => formData.append("requirements[]", requirement));

            // Handle Image Upload
            if (data.hiringImage && data.hiringImage.length > 0) {
                formData.append("hiringImage", data.hiringImage[0]); // Get first file
            }

            await createHiringPost(formData).unwrap();
            toast.success("Job post created successfully!");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Error creating job post:", err);
            toast.error(err?.data?.message || "Failed to create job post.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <EnaForm onSubmit={handleHiring} schema={hiringSchema} defaultValues={{ companyName: "", title: "" }}>
                <div className="grid grid-cols-2 gap-5 mb-5">
                    <EnaInput name="companyName" placeholder="Company Name" />
                    <EnaInput name="title" placeholder="Job Title" />
                    <EnaInput name="hiringImage" placeholder="Upload Image" type="file" />
                    <EnaInput name="jobNature" placeholder="Job Nature (e.g., Remote, On-Site)" />
                    <EnaInput name="workingHours" placeholder="Working Hours" />
                    <EnaInput name="workingDays" placeholder="Working Days" />
                    <EnaTextArea name="description" placeholder="Job Description" />
                    <EnaInput name="salaryRange" placeholder="Salary Range (e.g., 5000 - 10000)" />
                    <EnaInput name="location" placeholder="Job Location" />
                    <EnaInput name="experience" placeholder="Required Experience" />
                    <EnaInput name="applicationDeadline" type="date" placeholder="Application Deadline" />
                    <EnaInput name="jobType" placeholder="Job Type (full-time, part-time, remote, hybrid)" />
                    <EnaInput name="status" placeholder="Status (active, inactive, expired)" />
                    <EnaInput name="department" placeholder="Department" />

                    {/* Multi-input fields */}
                    <EnaMultiInput2 label="Skills Required" placeholder="Add skills..." onChange={setSkillsRequired} />
                    <EnaMultiInput2 label="Benefits Offered" placeholder="Add benefits..." onChange={setBenefits} />
                    <EnaMultiInput2 label="Job Responsibilities" placeholder="Add responsibilities..." onChange={setResponsibilities} />
                    <EnaMultiInput2 label="Interview Rounds" placeholder="Add interview rounds..." onChange={setInterviewRounds} />
                    <EnaMultiInput2 label="Requirements" placeholder="Add requirements..." onChange={setRequirements} />
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
