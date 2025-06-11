import { notFound } from 'next/navigation'
import { api } from "@/services/api";
import UsersAdmin from "@/components/UsersAdmin";
import { cookies } from 'next/headers'

async function getToken() {
    const cookieStore = await cookies();
    return cookieStore.get('token')?.value;
}

async function fetchAllUsers(token) {
    try {
        const res = await api.get(`/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });

        return res.data;

    } catch (err) {
        console.error('Erro ao buscar os usuários:', err);
        return undefined;
    }
}

export default async function UsersPage() {
    const token = await getToken();
    if (!token) {
        notFound();
    }

    const [initialUsers] = await Promise.all([
        fetchAllUsers(token),
    ]);

    if (!initialUsers) {
        notFound();
    }

    return <UsersAdmin initialUsers={initialUsers} />;
}