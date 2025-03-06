import { getAuthToken } from "@/lib/auth";

const getSingleBlog = async (id: string) => {
    const token = await getAuthToken();

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/single-blog/${id}`;
    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store", // Prevent caching issues
    });
    return res.json();
};

export default getSingleBlog;