import OurServices from "./OurServices";

async function getServices() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/service/get-all-services`,
      {
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    return { data: [] };
  }
}

const OurServicesPage = async () => {
  const { data: servicesData } = await getServices();

  return (
    <>
      <OurServices initialData={servicesData} />
    </>
  );
};

export default OurServicesPage;
