import DataTable from './DataTable';

const OrderTable = () => {
    const orders = [
        { order_id: 1, buyer_id: 2, payment_status: 'Paid', shipping_status: 'Shipped', order_date: '2024-12-01' },
        { order_id: 2, buyer_id: 3, payment_status: 'Pending', shipping_status: 'Processing', order_date: '2024-12-02' }
    ];

    const columns = ['order_id', 'buyer_id', 'payment_status', 'shipping_status', 'order_date'];

    return <DataTable data={orders} columns={columns} actions={true} />;
};

export default OrderTable;