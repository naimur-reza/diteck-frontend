import Input from "@/components/common/Input/Input";
import Textarea from "@/components/common/TextArea/TextArea";
import React from "react";

const CommentForm = () => {
  return (
    <div className="max-w-[90%] mx-[150px]">
      <h2 className="text-[42px] my-7 font-medium">Leave A Reply</h2>
      <p>
        Your email address will not be published. Required fields are marked *
      </p>
      <form className="grid grid-cols-1 lg:grid-cols-3 gap-5 my-5">
        <Input placeholder="Your Name *" />
        <Input placeholder="Email Address *" type="email" />
        <Input placeholder="Your Website" />
        <div className="col-span-3">
          <Textarea placeholder="Comment" rows={6} />
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
