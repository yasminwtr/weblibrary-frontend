'use client';
import { useState } from "react";
import { Button, Divider, Textarea, Avatar } from "@heroui/react";
import { DeleteIcon } from "@/components/Icons";
import { PaginationControl } from "@/components/PaginationControl";
import { useUser } from "@/contexts/UserContext";
import { useBookReviews } from "@/hooks/useBookReviews";
import { api } from "@/services/api";

export default function BookReviews({ bookId }) {
    const [currentPage, setCurrentPage] = useState(1);
    const { user } = useUser();
    const { fetchBookReviews, bookReviews } = useBookReviews(bookId);

    const createReview = async () => {
        try {
            await api.post('/bookreviews',
                { bookId: bookId, comment: document.querySelector('textarea').value }
            );

            alert('Avaliação realizada com sucesso.');
            fetchBookReviews();
            document.querySelector('textarea').value = '';

        } catch (err) {
            alert(err?.response?.data?.error)
        }
    };

    const deleteReview = async (reviewId) => {
        if (!confirm('Tem certeza que deseja deletar essa avaliação?')) return;

        try {
            await api.delete(`/bookreviews/${reviewId}`);
            alert('Avaliação deletada com sucesso.');
            fetchBookReviews();
        } catch (err) {
            alert(err?.response?.data?.error || 'Erro ao deletar a avaliação.');
        }
    };

    return (
        <div className="w-full mb-20">
            <h1 className="text-lg font-medium mb-8">Avaliações ({bookReviews.totalBookReviews})</h1>

            <Textarea rows="6" placeholder="Escreva sua avaliação" disableAutosize classNames={{ base: "mb-5", inputWrapper: "border-2" }} />

            <Button color="primary" className="" onPress={createReview}>Avaliar</Button>

            <div className="mt-10">
                {bookReviews.reviews.map((review) => {
                    return (
                        <div key={review.id}>
                            <Divider className="my-8" />

                            <div className="flex items-center mb-2 justify-between">
                                <div className="flex items-center text-sm">
                                    <Avatar className="w-6 h-6 mr-2" />
                                    <span className="font-medium mr-2">{review.userName}</span>
                                    <span className="text-gray-600 dark:text-gray-400 text-xs">({review.createdAt})</span>
                                </div>

                                {user?.userId === review.userId ?
                                    <Button className="bg-transparent" disableRipple={true} onPress={() => deleteReview(review.id)}>
                                        <DeleteIcon />
                                    </Button>
                                    :
                                    null
                                }
                            </div>

                            <span className="text-gray-500 dark:text-gray-400">{review.comment}</span>
                        </div>
                    );
                })}
            </div>

            <div className="books-pagination">
                <PaginationControl
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={bookReviews.totalPages}
                />
            </div>
        </div>
    );
}
