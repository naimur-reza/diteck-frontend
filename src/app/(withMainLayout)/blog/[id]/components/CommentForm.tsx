"use client";
import { ButtonWithIcon } from "@/components/common";
import Input from "@/components/common/Input/Input";
import Textarea from "@/components/common/TextArea/TextArea";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface CommentFormData {
  name: string;
  email: string;
  website?: string;
  comment: string;
  saveInfo: boolean;
}

const CommentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormData>();

  const onSubmit: SubmitHandler<CommentFormData> = (data) => {
    console.log("Submitted Data:", data);
  };

  return (
    <div className="max-w-[90%] mx-[150px]">
      <h2 className="text-[42px] my-7 font-medium">Leave A Reply</h2>
      <p>
        Your email address will not be published. Required fields are marked *
      </p>

      <form className="my-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Name Input */}
          <div>
            <Input
              placeholder="Your Name *"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <Input
              placeholder="Email Address *"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Website Input (Optional) */}
          <Input placeholder="Your Website" {...register("website")} />

          {/* Comment Textarea */}
          <div className="col-span-3">
            <Textarea
              placeholder="Comment *"
              rows={6}
              {...register("comment", { required: "Comment is required" })}
            />
            {errors.comment && (
              <p className="text-red-500 text-sm">{errors.comment.message}</p>
            )}
          </div>
        </div>

        {/* Checkbox for Save Info */}
        <div className="flex items-center gap-5 my-5">
          <input type="checkbox" {...register("saveInfo")} />
          <p>
            Save my name, email, and website in this browser for the next time I
            comment.
          </p>
        </div>

        {/* Submit Button */}
        <div>
          <ButtonWithIcon text="Post Comment" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
