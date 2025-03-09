import { getAuthToken } from "@/lib/auth";

const getSingleBlog = async (id: string) => {
  try {
    const token = await getAuthToken();
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/single-blog/${id}`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch blog: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching single blog:", error);
    return { error: "Failed to fetch blog post. Please try again later." };
  }
};

export default getSingleBlog;
