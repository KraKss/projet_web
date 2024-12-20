import { useState, useEffect } from "react";
import {addProfile, deleteProfileById, getAllProfiles, updateProfile} from "../API/controller/profile.js";
import DataTable from "./DataTable";
import useNotification from '../hook/useNotification.js';
import Notification from "./Notification";
import exponentialRetry from "./ExpodentialRetry.jsx";
import * as Yup from "yup";

const ProfileTable = () => {
    const [profiles, setProfiles] = useState([]);
    const { notification, showNotification } = useNotification();
    const [error, setError] = useState(null);

    const loadProfilesWithRetry = async () => {
        return exponentialRetry(async () => {
            const { data } = await getAllProfiles();
            return data;
        });
    };

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const profiles = await loadProfilesWithRetry();
                setProfiles(profiles);
            } catch (err) {
                console.error("Failed to load profiles:", err.message);
                setError("Erreur lors du chargement des profils");
            }
        };

        fetchProfiles();
    }, []);

    if (error) return <div>{error}</div>;

    const handleAddNew = async (newProfileData) => {
        if (newProfileData.balance) newProfileData.balance = parseFloat(newProfileData.balance);
        try {
            await addProfile(newProfileData);
            await loadProfilesWithRetry();
            showNotification("Profil ajouté avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de l'ajout du profil", error);
            showNotification("Une erreur est survenue lors de l'ajout ", "error");
        }
    };

    const handleUpdateItem = async (profile, updatedData) => {
        try {
            if (updatedData.balance) updatedData.balance = parseFloat(updatedData.balance);
            if (!updatedData.password || updatedData.password === profile.password) {
                delete updatedData.password;
            }
            await updateProfile(updatedData);
            await loadProfilesWithRetry();
            showNotification("Profil modifier avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil", error);
            showNotification("Une erreur est survenue lors de la modification ", "error");
        }
    };

    const handleDeleteProfile = async (profile) => {
        try {
            await deleteProfileById(profile.id);
            await loadProfilesWithRetry();
            showNotification("Profil supprimer avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la suppression du profil", error);
            showNotification("Une erreur est survenue lors de la suppression", "error");
        }
    };

    const columns = ["id", "name", "email", "address", "bank_account", "balance"];
    const formFields = ["name", "email", "password", "address", "bank_account", "balance"];

    const validationSchema = Yup.object().shape({
        balance: Yup.number().integer("Must be an integer")
            .nullable()
            .transform((value, originalValue) => (originalValue === "" ? null : value))
            .test(
                "is-valid-id",
                "Balance must be a valid integer or 0",
                (value) => value === null || value === 0 || value > 0 // Autorise 0 ou des nombres positifs
            ),
        bank_account: Yup.string()
            .matches(/^[A-Za-z]{2}\d+$/, 'invalid')  // Permet uniquement les chiffres
            .min(6, 'bank_account must be at least 6 characters')
            .max(20, 'bank_account must not exceed 20 characters')
            .required('bank_account is required'),
        address: Yup.string().required('Address is required').max(100, 'Address max 100 digits'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
        id: Yup.number().integer("must be entire").nullable().transform((value, originalValue) => (originalValue === "" ? null : value))

    });

    return (
        <div>
            <DataTable
                data={profiles}
                columns={columns}
                formFields={formFields}
                onAddNew={handleAddNew}
                onUpdateItem={handleUpdateItem}
                onDelete={handleDeleteProfile}
                validationSchema={validationSchema}
            />
            <Notification notification={notification} />
        </div>
    );
};

export default ProfileTable;