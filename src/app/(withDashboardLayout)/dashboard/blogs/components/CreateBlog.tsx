"use client";

import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import EnaForm from "@/components/forms/EnaForm";
import EnaInput from "@/components/forms/EnaInput";
import EnaTextArea from "@/components/forms/EnaTextArea";
import { useCreateBlogMutation } from "@/redux/api/adminApi/blogApi/blogApi";
import { blogSchema } from "@/schema/blogSchema";

const CreateBlog = () => {
    const [createBlog, { isLoading }] = useCreateBlogMutation();

    const handleCreateBlog = async (data: FieldValues) => {
        console.log("Blog Data:", data);

        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("bio", data.bio);
            formData.append("author", "65a3f2b9d4eabc1234567892"); // now hard coded
            formData.append("content", data.content);

            // Handle Thumbnail Upload
            if (data.thumbnail && data.thumbnail.length > 0) {
                formData.append("thumbnail", data.thumbnail[0]);
            }

            await createBlog(formData).unwrap();
            toast.success("Blog created successfully!");
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
                    <EnaInput name="title" placeholder="Blog Title" />
                    <EnaTextArea name="bio" placeholder="Short Description (Bio)" />
                    <EnaTextArea name="content" placeholder="Blog Content" />
                    <EnaInput name="thumbnail" placeholder="Upload Thumbnail" type="file" />
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
