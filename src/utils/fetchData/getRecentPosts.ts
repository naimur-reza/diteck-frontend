const getRecentPosts = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/all-blog`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch blog posts: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { data: [] }; // Return an empty array if fetching fails
  }
};

export default getRecentPosts;
