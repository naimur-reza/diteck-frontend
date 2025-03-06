const getSingleProject = async (id: string) => {

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/previous-work/${id}`;
    const res = await fetch(url, {
        cache: "no-store", // Prevent caching issues
    });
    return res.json();
};

export default getSingleProject;