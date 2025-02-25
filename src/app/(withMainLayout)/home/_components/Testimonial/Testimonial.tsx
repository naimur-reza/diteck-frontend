import { Feedback } from "@/components/common";
import { feedbacks } from "../../_constant/feedback";

export const Testimonial = () => {
  return (
    <div className="container mx-auto">
      <h2 className="text-white text-[205px] leading-[164px] text-center font-semibold -mb-[40px]">testimonials</h2>
      <Feedback feedbackData={feedbacks} buttonText="Hear from customer" />
    </div>
  );
};
