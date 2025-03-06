const getRecentPosts = async () => {

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/all-blog`;
    const res = await fetch(url);
    return res.json();
};

export default getRecentPosts;