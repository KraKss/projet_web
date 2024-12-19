import { useState } from "react";
import DataTable from "./DataTable";
import ReviewForm from "./Form/ReviewForm.jsx";

const ReviewTable = () => {
    const [reviews, setReviews] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [currentReview, setCurrentReview] = useState(null);

    const columns = ["reviewer_id", "seller_id", "rating", "comment", "review_date"];

    const handleAddReview = (newReview) => {
        setReviews((prevReviews) => [
            ...prevReviews,
            { ...newReview, id: prevReviews.length + 1 },
        ]);
        setIsAdding(false);
    };

    const handleEditReview = (review) => {
        setCurrentReview(review);
        setIsAdding(true);
    };

    return (
        <div>
            <DataTable
                data={reviews}
                columns={columns}
                seeJoinedTable={false}
                onEdit={handleEditReview}
                onAdd={() => {
                    setCurrentReview(null);
                    setIsAdding(true);
                }}
            />
            {isAdding && (
                <ReviewForm
                    dataUpdate={currentReview}
                    onSubmit={handleAddReview}
                    onCancel={() => setIsAdding(false)} // Annulation
                />
            )}
        </div>
    );
};

export default ReviewTable;
