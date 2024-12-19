import React, { useState } from 'react';
import DataTable from './DataTable';
import OrderForm from './Form/OrderForm.jsx';

const OrderTable = () => {
    const [orders, setOrders] = useState([
        { order_id: 1, buyer_id: 2, payment_status: 'Paid', shipping_status: 'Shipped', order_date: '2024-12-01' },
        { order_id: 2, buyer_id: 3, payment_status: 'Pending', shipping_status: 'Processing', order_date: '2024-12-02' },
    ]);
    const [isAdding, setIsAdding] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);

    const columns = ['order_id', 'buyer_id', 'payment_status', 'shipping_status', 'order_date'];

    const addOrder = (newOrder) => {
        setOrders((prevOrders) => [
            ...prevOrders,
            { ...newOrder, order_id: prevOrders.length + 1, order_date: new Date().toISOString().split('T')[0] },
        ]);
        setIsAdding(false);
    };

    const editOrder = (updatedOrder) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.order_id === updatedOrder.order_id ? updatedOrder : order
            )
        );
        setIsAdding(false);
    };

    const handleAdd = () => {
        setCurrentOrder(null);
        setIsAdding(true);
    };

    const handleEdit = (order) => {
        setCurrentOrder(order);
        setIsAdding(true);
    };

    return (
        <div>
            <DataTable
                data={orders}
                columns={columns}
                seeJoinedTable={true}
                onAdd={handleAdd}
                onEdit={handleEdit}
            />
            {isAdding && (
                <OrderForm
                    dataUpdate={currentOrder}
                    onSubmit={currentOrder ? editOrder : addOrder}
                    onCancel={() => setIsAdding(false)}
                />
            )}
        </div>
    );
};

export default OrderTable;
