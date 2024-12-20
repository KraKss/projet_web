import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Form from './Form.jsx';
import { useForm } from 'react-hook-form';
import {usePopup} from "../../provider/PopUpProvider.jsx";

const ReviewForm = ({ dataUpdate }) => {

    const {hidePopup } = usePopup();

    const idExist = dataUpdate?.reviewer_id !== undefined;

    const validationSchema = Yup.object().shape({
        reviewer_id: Yup.number().integer("Must be an integer").positive("Must be positive").required('Reviewer ID is required'),
        seller_id: Yup.number().integer("Must be an integer").positive("Must be positive").required('Seller ID is required'),
        rating: Yup.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5").required('Rating is required'),
        comment: Yup.string().required('Comment is required').max(500, 'Comment cannot exceed 500 characters'),
    });

    const { register,watch, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const fields = [
        ...(idExist ? [{
            name: 'reviewer_id',
            label: 'Reviewer ID',
            type: 'number',
            defaultValue: dataUpdate?.reviewer_id || '',
            readOnly: true,
            error: errors.reviewer_id?.message,
        }] : []),
        { name: 'seller_id', label: 'Seller ID', type: 'number', defaultValue: dataUpdate?.seller_id || '', error: errors.seller_id?.message },
        { name: 'rating', label: 'Rating', type: 'number', defaultValue: dataUpdate?.rating || '', error: errors.rating?.message },
        { name: 'comment', label: 'Comment', type: 'text', defaultValue: dataUpdate?.comment || '', error: errors.comment?.message },
    ];

    const onSubmit = (data) => {
        console.log("watch ici ",watch())
        if (dataUpdate) {
            console.log("", { ...dataUpdate, ...data });
        } else {
            console.log("data", data);
        }

        const formData = new FormData();

        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);

        }

        console.log(formData);

        hidePopup();
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
        </>
    );
};

export default ReviewForm;
