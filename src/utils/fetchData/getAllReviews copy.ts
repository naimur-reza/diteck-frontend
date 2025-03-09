const getAllReviews = async () => {

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/review/all-reviews`;
    const res = await fetch(url);
    return res.json();
};

export default getAllReviews;