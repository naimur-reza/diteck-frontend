import { Feedback } from "@/components/common";
import { TReview } from "@/types";
import { getAllReviews } from "@/utils/fetchData/getAllReviews";

export const Testimonial = async () => {
  const { data: feedbackData = [] }: { data: TReview[] } = await getAllReviews();

  return (
    <div className="container mx-auto">
      <h2 className="text-white text-[205px] leading-[164px] text-center font-semibold -mb-[40px]">
        testimonials
      </h2>
      <Feedback feedbackData={feedbackData} buttonText="Hear from customer" />
    </div>
  );
};
