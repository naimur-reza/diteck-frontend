const getAllTeamMembers = async () => {

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/team-member/get-all-users`;
    const res = await fetch(url);
    return res.json();
};

export default getAllTeamMembers;