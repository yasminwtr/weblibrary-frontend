import { notFound } from 'next/navigation'
import { api } from "@/services/api";
import BooksAdmin from "@/components/BooksAdmin";
import { cookies } from 'next/headers'

async function getToken() {
    const cookieStore = await cookies();
    return cookieStore.get('token')?.value;
}

async function fetchAllBooks(token) {
    try {
        const res = await api.get(`/books`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });

        return res.data;

    } catch (err) {
        console.error('Erro ao buscar os livros:', err);
        return undefined;
    }
}

export default async function BooksPage() {
    const token = await getToken();
    if (!token) {
        notFound();
    }

    const [initialBooks] = await Promise.all([
        fetchAllBooks(token),
    ]);

    if (!initialBooks) {
        notFound();
    }

    return <BooksAdmin initialBooks={initialBooks} />;
}