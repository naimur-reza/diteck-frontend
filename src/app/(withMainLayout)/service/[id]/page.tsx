import type { TService } from "@/types";
import getSingleService from "@/utils/fetchData/getSingleService";
import { notFound } from "next/navigation";
import ServiceDetailsPageNew from "./_components/ServiceDetailsPageNew/ServiceDetailsPageNew";

const ServiceDetailsRoute = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  try {
    // Fetch the service data
    const { data: service } = (await getSingleService(id)) as {
      data: TService;
    };

    // If no service is found, show the 404 page
    if (!service) {
      return notFound();
    }

    return <ServiceDetailsPageNew service={service} />;
  } catch (error) {
    console.error("Error fetching service:", error);
    return notFound();
  }
};

export default ServiceDetailsRoute;
