"use client";

import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import EnaForm from "@/components/forms/EnaForm";
import EnaInput from "@/components/forms/EnaInput";
import EnaTextArea from "@/components/forms/EnaTextArea";
import { useCreateBlogMutation } from "@/redux/api/adminApi/blogApi/blogApi";
import { blogSchema } from "@/schema/blogSchema";
import { EnaFileUpload } from "@/components/forms";

const CreateBlog = ({ closeModal }: { closeModal: () => void }) => {
    const [createBlog, { isLoading }] = useCreateBlogMutation();

    const handleCreateBlog = async (data: FieldValues) => {

        try {

            const formData = new FormData();

            // Convert JSON data into a string and append it to the "data" field
            const jsonData = {
                title: data.title,
                bio: data.bio,
                author: "65a3f2b9d4eabc1234567892",
                content: data.content,
            };

            formData.append("data", JSON.stringify(jsonData)); // ✅ Send JSON as a string
            formData.append("file", data.file);

            await createBlog(formData).unwrap();
            toast.success("Blog created successfully!");
            closeModal();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Error creating blog:", err);
            toast.error(err?.data?.message || "Failed to create blog.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <EnaForm onSubmit={handleCreateBlog} schema={blogSchema} defaultValues={{ title: "", bio: "", content: "" }}>
                <div className="grid grid-cols-1 gap-5 mb-5">
                    <EnaInput label="Blog Title" name="title" placeholder="Blog Title" />
                    <EnaTextArea label="Short Description" name="bio" placeholder="Short Description (Bio)" />
                    <EnaTextArea label="Blog Content" name="content" placeholder="Blog Content" />
                    <EnaFileUpload
                        label="Thumbnail"
                        name="file"
                        accept="image/*"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-hover cursor-pointer"
                    disabled={isLoading}
                >
                    {isLoading ? "Creating..." : "Create Blog"}
                </button>
            </EnaForm>
        </div>
    );
};

export default CreateBlog;
