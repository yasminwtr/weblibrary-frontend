import { notFound } from 'next/navigation'
import { api } from "@/services/api";
import LoansAdmin from "@/components/LoansAdmin";
import { cookies } from 'next/headers'

async function getToken() {
    const cookieStore = await cookies();
    return cookieStore.get('token')?.value;
}

async function fetchAllLoans(token) {
    try {
        const res = await api.get(`/loans`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });

        return res.data;

    } catch (err) {
        console.error('Erro ao buscar os empréstimos:', err);
        return undefined;
    }
}

export default async function LoansPage() {
    const token = await getToken();
    if (!token) {
        notFound();
    }

    const [initialLoans] = await Promise.all([
        fetchAllLoans(token),
    ]);

    if (!initialLoans) {
        notFound();
    }

    return <LoansAdmin initialLoans={initialLoans} />;
}