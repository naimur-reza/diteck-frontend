"use client";

import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import EnaForm from "@/components/forms/EnaForm";
import EnaInput from "@/components/forms/EnaInput";
import EnaTextArea from "@/components/forms/EnaTextArea";
import { useCreateBlogMutation, useUpdateBlogMutation } from "@/redux/api/adminApi/blogApi/blogApi";
import { blogSchema } from "@/schema/blogSchema";
import { EnaFileUpload } from "@/components/forms";
import { TBlog } from "@/types";

const CreateUpdateBlog = ({ closeModal, blog }: { closeModal: () => void, blog?: TBlog | null | undefined }) => {
    const [createBlog, { isLoading }] = useCreateBlogMutation();
    const [updateBlog, { isLoading: updateIsLoading }] = useUpdateBlogMutation();

    const handleCreateUpdate = async (data: FieldValues) => {
        try {
            const formData = new FormData();

            const jsonData = {
                title: data.title,
                bio: data.bio,
                author: "65a3f2b9d4eabc1234567892",
                content: data.content,
            };

            formData.append("data", JSON.stringify(jsonData));

            if (data.file) {
                formData.append("file", data.file);
            }


            if (blog?._id) {
                await updateBlog({ id: blog?._id, data: formData }).unwrap();
                toast.success("Blog updated successfully!");
            } else {
                await createBlog(formData).unwrap();
                toast.success("Blog created successfully!");
            }

            closeModal();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Error creating/updating blog:", err);
            toast.error(err?.data?.message || "Failed to create/update blog.");
        }
    };


    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <EnaForm onSubmit={handleCreateUpdate} schema={blogSchema} defaultValues={{
                title: blog?.title || "",
                bio: blog?.bio || "",
                content: blog?.content || "",
            }}>
                <div className="grid lg:grid-cols-2 gap-5 mb-5">
                    <EnaInput label="Blog Title" name="title" placeholder="Blog Title" />
                    <EnaFileUpload
                        label="Thumbnail"
                        name="file"
                        accept="image/*"
                    />
                    <EnaTextArea label="Short Description" name="bio" placeholder="Short Description (Bio)" />
                    <EnaTextArea label="Blog Content" name="content" placeholder="Blog Content" />
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-hover cursor-pointer"
                    disabled={isLoading || updateIsLoading}
                >
                    {isLoading || updateIsLoading
                        ? "Processing..."
                        : blog?._id
                            ? "Update Blog"
                            : "Create Blog"
                    }
                </button>
            </EnaForm>
        </div>
    );
};

export default CreateUpdateBlog;
