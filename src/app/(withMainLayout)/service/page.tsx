import assets from "@/assets";
import { ParallaxBanner, SectionTitle } from "@/components/common";
import { ServiceCard, WhyChooseUs } from "./_components";
import { TService } from "@/types";

const getServicesData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/service/get-all-services`,
      {
        next: { revalidate: 3000 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch services: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    return null;
  }
};

const Service = async () => {
  const services = await getServicesData();
  const servicesData: TService[] = services?.data || [];
  return (
    <div>
      <ParallaxBanner
        img={assets.banner.serviceBanner.src}
        title="Our Services"
        pageTitle="services"
      />

      <div className="container mx-auto">
        {/* Section title */}
        <div className="my-[50px]">
          <SectionTitle
            title="Innovative digital solution services"
            buttonText="What we do"
          />
        </div>

        {/* Error message if services fail to load */}
        {!services ? (
          <div className="text-center text-red-500">
            Failed to load services. Please try again later.
          </div>
        ) : (
          <>
            {/* Services card */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {servicesData?.map((item: TService, idx: number) => (
                <div
                  key={idx}
                  className={`${idx === 2 ? "lg:col-span-2" : ""}`}
                >
                  <ServiceCard item={item} />
                </div>
              ))}
            </div>

            {/* Why choose us */}
            <WhyChooseUs />
          </>
        )}
      </div>
    </div>
  );
};

export default Service;
