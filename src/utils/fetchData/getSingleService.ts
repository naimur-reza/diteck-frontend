import { getAuthToken } from "@/lib/auth";

const getSingleService = async (id: string) => {
  console.log(id);
  try {
    const token = await getAuthToken();
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/service/get-service-by-slug/${id}`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch service: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching single service:", error);
    return { error: "Failed to fetch service post. Please try again later." };
  }
};

export default getSingleService;
