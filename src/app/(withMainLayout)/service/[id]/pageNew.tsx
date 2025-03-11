import { notFound } from "next/navigation"
import type { TService } from "@/types"
import ServiceDetailsPage from "./_components/ServiceDetailsPage/ServiceDetailsPage"
import getSingleService from "@/utils/fetchData/getSingleService"

const ServiceDetailsRoute = async ({ params }: { params: { id: string } }) => {
  try {
    // Fetch the service data
    const { data: service } = (await getSingleService(params?.id)) as { data: TService }

    // If no service is found, show the 404 page
    if (!service) {
      return notFound()
    }

    return <ServiceDetailsPage service={service} />
  } catch (error) {
    console.error("Error fetching service:", error)
    return notFound()
  }
}

export default ServiceDetailsRoute