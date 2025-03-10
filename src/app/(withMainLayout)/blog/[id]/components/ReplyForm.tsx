"use client";
import { ButtonWithIcon } from "@/components/common";
import Input from "@/components/common/Input/Input";
import Textarea from "@/components/common/TextArea/TextArea";
import { useNotification } from "@/hooks/useNotification";
import { useReplyCommentMutation } from "@/redux/api/adminApi/blogApi/blogApi";
import { TComment } from "@/types";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface ReplyFormData {
  commenterName: string;
  text: string;
  email: string;
  website?: string;
  saveInfo: boolean;
}

const ReplyForm = ({ blogId, parentComment }: { blogId: string, parentComment: TComment }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ReplyFormData>();

  const [replyComment, { isLoading, isError, isSuccess, data }] = useReplyCommentMutation();

  const onSubmit: SubmitHandler<ReplyFormData> = (data) => {
    replyComment({ data: { ...data, blogId }, parentCommentId: parentComment?._id });
    reset()
  };

  useNotification({ isLoading, isError, isSuccess, data });

  return (
    <div className="lg:max-w-[90%]">
      <h2 className="text-[42px] my-7 font-medium">Reply to {parentComment?.commenterName}</h2>
      <p>
        Your email address will not be published. Required fields are marked *
      </p>

      <form className="my-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Name Input */}
          <div>
            <Input
              placeholder="Your Name *"
              {...register("commenterName", { required: "Name is required" })}
            />
            {errors.commenterName && (
              <p className="text-red-500 text-sm">{errors.commenterName.message}</p>
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
          <div className="lg:col-span-3">
            <Textarea
              placeholder="Comment *"
              rows={6}
              {...register("text", { required: "Comment is required" })}
            />
            {errors.text && (
              <p className="text-red-500 text-sm">{errors.text.message}</p>
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
          <ButtonWithIcon text=" Reply Comment" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default ReplyForm;
