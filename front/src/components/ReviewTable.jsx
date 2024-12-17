import DataTable from './DataTable';

const ReviewTable = () => {
    const reviews = [
        { reviewer_id: 1, seller_id: 2, rating: 5, comment: 'Great product!', review_date: '2024-12-01' },
        { reviewer_id: 2, seller_id: 3, rating: 4, comment: 'Good quality', review_date: '2024-12-02' }
    ];

    const columns = ['reviewer_id', 'seller_id', 'rating', 'comment', 'review_date'];

    return <DataTable data={reviews} columns={columns} actions={false} />;
};

export default ReviewTable;