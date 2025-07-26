export interface Member {
    memberId: string;
    firstName: string;
    lastName: string;
    email: string;
}

const BASE_URL = process.env.BACKEND_URL || "http://127.0.0.1:80";
const M_URL = `${BASE_URL}/api/members`;

export async function getMembers(query?: URLSearchParams): Promise<Member[]> {
    const url = new URL(M_URL);
    if (query) {
        url.searchParams.set("query", query.toString());
    }
    const response = await fetch(url);
    if (!response.ok) {
        throw await response.json();
    }
    const data = await response.json();
    console.log(data);
    return data.data?.members || [];
}

export async function getMember(memberId: string): Promise<Member> {
    const url = new URL(`${M_URL}/${memberId}`);
    const response = await fetch(url);
    
    if (!response.ok) {
        throw await response.json();
    }
    
    const data = await response.json();
    console.log(data);
    if (!data.data) {
        throw new Error(`Failed to fetch member: ${response.statusText}`);
    }
    return data.data.member;
}