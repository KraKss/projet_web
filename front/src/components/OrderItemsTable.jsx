import DataTable from './DataTable';

const OrderItemsTable = () => {
    const ordersItems = [
        { order_id: 1, quantity: 2, product_name: 'Paid', product_desc: 'Shipped' }
    ];

    const columns = ['order_id', 'quantity', 'product_name', 'product_desc'];

    return <DataTable data={ordersItems} columns={columns} />;
};

export default OrderItemsTable;