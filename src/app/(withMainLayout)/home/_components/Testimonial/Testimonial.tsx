import { Feedback } from "@/components/common";
import { feedbacks } from "../../_constant/feedback";

export const Testimonial = () => {
  return (
    <div className="container mx-auto">
      <Feedback feedbackData={feedbacks} buttonText="Hear from customer" />
    </div>
  );
};
