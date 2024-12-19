import React, { useState } from 'react';
import DataTable from './DataTable';
import ReviewForm from './Form/ReviewForm.jsx';

const ReviewTable = () => {
    const [reviews, setReviews] = useState([
        { reviewer_id: 1, seller_id: 2, rating: 5, comment: 'Great product!', review_date: '2024-12-01' },
        { reviewer_id: 2, seller_id: 3, rating: 4, comment: 'Good quality', review_date: '2024-12-02' },
    ]);

    const columns = ['reviewer_id', 'seller_id', 'rating', 'comment', 'review_date'];

    const addReview = (newReview) => {
        setReviews((prevReviews) => [
            ...prevReviews,
            { ...newReview, review_date: new Date().toISOString().split('T')[0] },
        ]);
    };

    return (
        <div>
            <DataTable
                data={reviews}
                columns={columns}
                form={( dataUpdate = null) => {
                    console.log(dataUpdate);
                    return <ReviewForm  dataUpdate={dataUpdate}/>}
                }
            />
        </div>
    );
};

export default ReviewTable;
