import DataTable from './DataTable';
import { useEffect, useState } from 'react';
import OrderItemForm from './Form/OrderItemForm.jsx';

const OrderItemsTable = () => {
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const mockData = [
                { order_id: 1, quantity: 2, product_id: 1},
                { order_id: 2, quantity: 1, product_id: 2 },
            ];
            setOrderItems(mockData);
        };
        fetchData();
    }, []);

    const columns = ['order_id', 'quantity', 'product_id'];

    const addOrderItem = (newOrderItem) => {
        setOrderItems((prevOrderItems) => [
            ...prevOrderItems,
            { ...newOrderItem, order_id: prevOrderItems.length + 1 },
        ]);
    };

    return (
        <div>
            <DataTable
                data={orderItems}
                columns={columns}
                form={( dataUpdate = null) => {
                    console.log(dataUpdate);
                    return <OrderItemForm  dataUpdate={dataUpdate}/>}
                }
            />
        </div>
    );
};

export default OrderItemsTable;
