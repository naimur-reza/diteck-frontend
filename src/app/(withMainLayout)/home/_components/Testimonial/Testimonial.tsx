import { Feedback } from "@/components/common";
import { TReview } from "@/types";
import { getAllReviews } from "@/utils/fetchData/getAllReviews";

export const Testimonial = async () => {
  const { data: feedbackData = [] }: { data: TReview[] } = await getAllReviews();

  return (
    <div className="container mx-auto ">
      <h2 className="text-white text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[205px] leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-[164px] text-center font-semibold -mb-3 md:-mb-6 lg:-mb-[40px]">
        testimonials
      </h2>
      {feedbackData && feedbackData.length > 0 && (
        <Feedback feedbackData={feedbackData} buttonText="Hear from customer" />
      )}
    </div>
  );
};
