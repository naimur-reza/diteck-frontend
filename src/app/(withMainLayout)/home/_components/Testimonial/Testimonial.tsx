import { AnimatedTestimonials } from "@/components/ui/testimonial";
import { TReview } from "@/types";
import { getAllReviews } from "@/utils/fetchData/getAllReviews";

export const Testimonial = async () => {
  const { data: testimonials = [] }: { data: TReview[] } =
    await getAllReviews();

  return (
    <section className="container mx-auto ">
      <h2 className="text-white text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[205px] leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-[164px] text-center font-semibold -mb-3 md:-mb-6 lg:-mb-[40px]">
        testimonials
      </h2>
      <div className="bg-white/20 backdrop-blur-lg rounded-4xl shadow-accent-foreground">
        {testimonials && testimonials.length > 0 ? (
          <AnimatedTestimonials
            testimonials={testimonials.map((review) => ({
              quote: review.comment,
              name: review.clientName,
              designation: review.clientOrganization || "",
              src: review.clientPhotoUrl || "",
            }))}
          />
        ) : (
          <p className="text-center mt-20 text-2xl font-medium bg-white p-5 rounded-2xl">
            No Testimonials Found
          </p>
        )}
      </div>
    </section>
  );
};
