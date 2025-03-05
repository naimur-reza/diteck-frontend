import { logout, setUser } from "@/redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useFetchUser = (token: string) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/get-me`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const userData = await response.json();
                dispatch(setUser({ token, user: userData?.data }));
            } catch (error) {
                console.error("Error fetching user:", error);
                dispatch(logout());
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [dispatch, token]);

    return { loading };
};

export default useFetchUser;
