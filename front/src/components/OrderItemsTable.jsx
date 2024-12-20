import DataTable from './DataTable';
import { useEffect, useState } from 'react';
import OrderItemForm from './Form/OrderItemForm.jsx';

const OrderItemsTable = () => {
    const [orderItems, setOrderItems] = useState([]);

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
