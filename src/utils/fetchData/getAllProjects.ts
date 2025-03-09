const getAllProjects = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/previous-work`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { data: [] };
  }
};

export default getAllProjects;
