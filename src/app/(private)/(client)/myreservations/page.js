import { notFound } from 'next/navigation'
import { api } from "@/services/api";
import ReservationsInfo from "@/components/ReservationsInfo";
import { cookies } from 'next/headers'

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value;
}

async function fetchUserReservationsAndLoans(token) {
  try {
    const res = await api.get(`/users/reservations-and-loans`, {
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

export default async function UserReservationsPage() {
  const token = await getToken();
  if (!token) {
    notFound();
  }

  const [userReservationsLoans] = await Promise.all([
    fetchUserReservationsAndLoans(token),
  ]);

  if (!userReservationsLoans) {
    notFound();
  }

  return <ReservationsInfo userReservationsLoans={userReservationsLoans} />;
}