import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import OrderItemForm from './Form/OrderItemForm.jsx';

const OrderItemsTable = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [currentOrderItem, setCurrentOrderItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const mockData = [
                { order_id: 1, quantity: 2, product_name: 'Widget A', product_desc: 'First Order' },
                { order_id: 2, quantity: 1, product_name: 'Widget B', product_desc: 'Second Order' },
            ];
            setOrderItems(mockData);
        };
        fetchData();
    }, []);

    const columns = ['order_id', 'quantity', 'product_name', 'product_desc'];

    const addOrderItem = (newOrderItem) => {
        setOrderItems((prevOrderItems) => [
            ...prevOrderItems,
            { ...newOrderItem, order_id: prevOrderItems.length + 1 },
        ]);
        setIsAdding(false);
    };

    const editOrderItem = (updatedOrderItem) => {
        setOrderItems((prevOrderItems) =>
            prevOrderItems.map((item) =>
                item.order_id === updatedOrderItem.order_id ? updatedOrderItem : item
            )
        );
        setIsAdding(false);
    };

    const handleAdd = () => {
        setCurrentOrderItem(null);
        setIsAdding(true);
    };

    const handleEdit = (orderItem) => {
        setCurrentOrderItem(orderItem);
        setIsAdding(true);
    };

    return (
        <div>
            <DataTable
                data={orderItems}
                columns={columns}
                seeJoinedTable={false}
                onAdd={handleAdd}
                onEdit={handleEdit}
            />
            {isAdding && (
                <OrderItemForm
                    dataUpdate={currentOrderItem}
                    onSubmit={currentOrderItem ? editOrderItem : addOrderItem}
                    onCancel={() => setIsAdding(false)}
                />
            )}
        </div>
    );
};

export default OrderItemsTable;
