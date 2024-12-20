import 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Form from './Form.jsx';
import { useForm } from 'react-hook-form';
import {usePopup} from "../../provider/PopUpProvider.jsx";

const ProfileForm = ({ dataUpdate }) => {

    const idExist = dataUpdate?.user_id !== undefined;

    const {hidePopup } = usePopup();

    const validationSchema = Yup.object().shape({
        balance: Yup.number().integer("Must be an integer").nullable()
            .transform((value, originalValue) => (originalValue === "" ? null : value))
            .test("is-valid-id", "Balance must be a valid integer or 0",
                (value) => value === null || value === 0 || value > 0),
        bank_account: Yup.string()
            .matches(/^[A-Za-z]{2}\d+$/, 'invalid')
            .min(6, 'bank_account must be at least 6 characters')
            .max(20, 'bank_account must not exceed 20 characters')
            .nullable() // Permet au champ d'accepter "null" comme valeur valide
            .transform(value => (value === "" ? null : value)) // Transforme "" en null
            .notRequired(), // Rend le champ optionnel

        address: Yup.string().required('Address is required').max(100, 'Address max 100 digits'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        image: Yup.mixed().nullable(),
        name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
        user_id: Yup.number().integer("must be entire").nullable()
            .transform((value, originalValue) => (originalValue === "" ? null : value))
    });

    const { register,watch, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });


    const fields = [
        ...(idExist ? [{
            name: 'user_id',
            label: 'User ID',
            type: 'number',
            defaultValue: dataUpdate?.user_id || '',
            readOnly: true,
            error: errors.user_id?.message,
        }] : []),
        { name: 'image', label: 'Avatar', type: 'file', accept: "image/*",defaultValue: dataUpdate?.image || '', error: errors.image?.message },
        { name: 'name', label: 'Name', type: 'text', defaultValue: dataUpdate?.name || '', error: errors.name?.message },
        { name: 'email', label: 'Email', type: 'email', defaultValue: dataUpdate?.email || '', error: errors.email?.message },
        { name: 'password', label: 'Password', type: 'password', defaultValue: dataUpdate?.password, error: errors.password?.message },
        { name: 'address', label: 'Address', type: 'text', defaultValue: dataUpdate?.address || '', error: errors.address?.message },
        { name: 'bank_account', label: 'Bank Account', type: 'text', defaultValue: dataUpdate?.bank_account || '', error: errors.bank_account?.message },
        { name: 'balance', label: 'Balance', type: 'number', defaultValue: dataUpdate?.balance || null, error: errors.balance?.message },
    ];

    const onSubmit = (data) => {
        console.log("watch ici ",watch())
        /*
        for (const [key, value] of Object.entries(watch())) {
            console.log(key, value);
        }
         */

        if (dataUpdate) {
            console.log("", { ...dataUpdate, ...data });
        } else {
            console.log("data", data);
        }

        const formData = new FormData();

        for (const [key, value] of Object.entries(data)) {
            if (value instanceof FileList) {
                // Si la valeur est un FileList, ajoutez chaque fichier individuellement
                Array.from(value).forEach((file) => formData.append(key, file));
            } else {
                // Sinon, ajoutez simplement la valeur
                formData.append(key, value);
            }
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

export default ProfileForm;
