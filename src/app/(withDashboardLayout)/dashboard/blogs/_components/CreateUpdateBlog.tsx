"use client";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import EnaForm from "@/components/forms/EnaForm";
import EnaInput from "@/components/forms/EnaInput";
import EnaTextArea from "@/components/forms/EnaTextArea";
import { useCreateBlogMutation, useUpdateBlogMutation } from "@/redux/api/adminApi/blogApi/blogApi";
import { blogSchema } from "@/schema/blogSchema";
import { EnaFileUpload, EnaSelect } from "@/components/forms";
import { TBlog, TError } from "@/types";
import { useAppSelector } from "@/redux/hooks";
import ErrorMessage from "@/components/dashboard/ErrorMessage/ErrorMessage";
import { categories } from "../_constants/constant";
import EnaEditor from "@/components/common/EnaEditor/EnaEditor";

const CreateUpdateBlog = ({ closeModal, blog }: { closeModal: () => void, blog?: TBlog | null | undefined }) => {
    const [description, setDescription] = useState("");

    const [createBlog, { isLoading, error: createError }] = useCreateBlogMutation();
    const [updateBlog, { isLoading: updateIsLoading, error: updateError }] = useUpdateBlogMutation();

    const error = createError || updateError;
    const loading = isLoading || updateIsLoading;

    const { user } = useAppSelector(state => state.auth);



    const handleCreateUpdate = async (data: FieldValues) => {
        try {
            const formData = new FormData();

            const jsonData = {
                title: data.title,
                bio: data.bio,
                author: user?._id,
                category: data.category,
                // content: data.content,
                content: description,
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
        <div className="max-w-3xl mx-auto p-2 bg-white shadow-lg rounded-lg">
            <EnaForm onSubmit={handleCreateUpdate} schema={blogSchema} defaultValues={{
                title: blog?.title || "",
                bio: blog?.bio || "",
                category: blog?.category || "",
                content: blog?.content || "",
            }}>
                <div className="grid gap-5 mb-5">
                    <EnaInput label="Blog Title" name="title" placeholder="Blog Title" />
                    <EnaFileUpload
                        label="Thumbnail"
                        name="file"
                        accept="image/*"
                    />

                    <EnaSelect label="Category" name="category" placeholder="Category" options={categories} />

                    <EnaTextArea label="Short Description" name="bio" placeholder="Short Description (Bio)" />

                    {/* <EnaTextArea label="Blog Content" name="content" placeholder="Blog Content" /> */}

                    <EnaEditor defaultValue={blog?.content || description} setDescription={setDescription} />
                </div>
                {/* Show error messages */}
                {!loading && <ErrorMessage error={error as TError} />}
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
