const getAllProjects = async () => {

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/previous-work`;
    const res = await fetch(url);
    return res.json();
};

export default getAllProjects;