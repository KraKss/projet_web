import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Form from './Form.jsx'; // Composant Form


const ProductForm = ({ dataUpdate}) => {

    const validationSchema = Yup.object().shape({
        seller_id: Yup.number().required("Seller ID is required").positive("Must be positive").integer("Must be entire"),
        name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
        description: Yup.string().nullable().max(1024, 'Maximum 1024 characters'),
        filament_type: Yup.string().required('Filament type is required').min(3, 'Minimum 3 characters'),
        price: Yup.number().positive("Price must be positive").required('Price is required'),
    });

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    // Configuration dynamique des champs
    const fields = [
        {
            name: 'product_id',
            label: 'Product ID',
            type: 'number',
            defaultValue: dataUpdate?.product_id || null,
            readOnly: true,
            error: errors.product_id?.message,
        },
        {
            name: 'seller_id',
            label: 'Seller ID',
            type: 'number',
            defaultValue: dataUpdate?.seller_id || '',
            error: errors.seller_id?.message,
        },
        {
            name: 'name',
            label: 'Product Name',
            type: 'text',
            defaultValue: dataUpdate?.name || '',
            error: errors.name?.message,
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
            defaultValue: dataUpdate?.description || '',
            error: errors.description?.message,
        },
        {
            name: 'filament_type',
            label: 'Filament Type',
            type: 'text',
            defaultValue: dataUpdate?.filament_type || '',
            error: errors.filament_type?.message,
        },
        {
            name: 'price',
            label: 'Price',
            type: 'number',
            defaultValue: dataUpdate?.price || '0.0',
            error: errors.price?.message,
        },
    ];

    const onSubmit = (data) => {
        if (dataUpdate) {
            console.log("", { ...dataUpdate, ...data });
        } else {
            console.log("", data);
        }

        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }
        console.log(formData);
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

export default ProductForm;
