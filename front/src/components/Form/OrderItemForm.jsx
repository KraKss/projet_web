import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Form from './Form';

const OrderItemForm = ({ dataUpdate }) => {

    const validationSchema = Yup.object().shape({
        order_id: Yup.number().integer('Order ID must be an integer').required('Order ID is required'),
        product_id: Yup.number().integer('Product ID must be an integer').required('Product ID is required'),
        quantity: Yup.number().integer('Quantity must be an integer').required('Quantity is required'),
    });

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const fields = [
        {
            name: 'order_id',
            label: 'Order ID',
            type: 'number',
            defaultValue: dataUpdate?.order_id || '',
            readOnly: true,
            error: errors.order_id?.message,
        },
        {
            name: 'product_id',
            label: 'Product ID',
            type: 'number',
            defaultValue: dataUpdate?.product_id || '',
            error: errors.product_id?.message,
        },
        {
            name: 'quantity',
            label: 'Quantity',
            type: 'number',
            defaultValue: dataUpdate?.quantity || '',
            error: errors.quantity?.message,
        },
    ];

    const onSubmit = (data) => {
        console.log("Submitted Data:", data);
        if (dataUpdate) {
            console.log("Updated Data:", { ...dataUpdate, ...data });
        } else {
            console.log("New Data:", data);
        }
    };

    const onCancel = () => {
        console.log("Form submission cancelled");
    };

    return (
        <>
            <Form
                fields={fields}
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
                onCancel={onCancel}
                register={register}
            />
            <pre>{JSON.stringify(watch(), null, 2)}</pre> {/* Visualisation des valeurs en temps réel */}

        </>
    );
};

export default OrderItemForm;
