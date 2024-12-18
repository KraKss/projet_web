import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Form from './Form.jsx';
import { useForm } from 'react-hook-form';

const OrderForm = ({ dataUpdate }) => {
    const idExist = dataUpdate?.order_id !== undefined;

    const validationSchema = Yup.object().shape({
        order_id: Yup.number().integer("Must be an integer").positive("Must be positive").nullable(),
        buyer_id: Yup.number().integer("Must be an integer").positive("Must be positive").required('Buyer ID is required'),
        payment_status: Yup.string().required('Payment Status is required').max(50, 'Payment Status cannot exceed 50 characters'),
        shipping_status: Yup.string().required('Shipping Status is required').max(50, 'Shipping Status cannot exceed 50 characters'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const fields = [
        ...(idExist ? [{
            name: 'order_id',
            label: 'Order ID',
            type: 'number',
            defaultValue: dataUpdate?.order_id || '',
            readOnly: true,
            error: errors.order_id?.message,
        }] : []),
        { name: 'buyer_id', label: 'Buyer ID', type: 'number', defaultValue: dataUpdate?.buyer_id || '', error: errors.buyer_id?.message },
        { name: 'payment_status', label: 'Payment Status', type: 'text', defaultValue: dataUpdate?.payment_status || '', error: errors.payment_status?.message },
        { name: 'shipping_status', label: 'Shipping Status', type: 'text', defaultValue: dataUpdate?.shipping_status || '', error: errors.shipping_status?.message },
    ];

    const onSubmit = (data) => {
        console.log("Order Form Submitted", data);
        if (dataUpdate) {
            console.log("Updated Order", { ...dataUpdate, ...data });
        } else {
            console.log("New Order", data);
        }
    };

    const onCancel = () => {
        console.log("Form submission cancelled");
    };

    return (
        <Form
            fields={fields}
            onSubmit={handleSubmit(onSubmit)}
            onCancel={onCancel}
        />
    );
};

export default OrderForm;
