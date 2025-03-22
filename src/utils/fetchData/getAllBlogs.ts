const getAllBlogs = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    // Check if the base URL is defined
    if (!baseUrl) {
      console.error("API base URL is undefined");
      return { data: [] };
    }

    const url = `${baseUrl}/blog/all-blog`;

    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch blogs: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { data: [] };
  }
};

export default getAllBlogs;
