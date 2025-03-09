const getSingleProject = async (id: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/previous-work/${id}`;
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch project: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching project:", error);
    return { data: null };
  }
};

export default getSingleProject;
