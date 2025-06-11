import { notFound } from 'next/navigation'
import { api } from "@/services/api";
import ReservationsAdmin from "@/components/ReservationsAdmin";
import { cookies } from 'next/headers'

async function getToken() {
    const cookieStore = await cookies();
    return cookieStore.get('token')?.value;
}

async function fetchAllReservations(token) {
    try {
        const res = await api.get(`/reservations`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });

        return res.data;

    } catch (err) {
        console.error('Erro ao buscar as reservas:', err);
        return undefined;
    }
}

export default async function ReservationsPage() {
    const token = await getToken();
    if (!token) {
        notFound();
    }

    const [initialReservations] = await Promise.all([
        fetchAllReservations(token),
    ]);

    if (!initialReservations) {
        notFound();
    }

    return <ReservationsAdmin initialReservations={initialReservations} />;
}