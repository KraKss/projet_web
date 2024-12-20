import { useState, useEffect } from "react";
import {addProfile, deleteProfileById, getAllProfiles, updateProfile} from "../API/controller/profile.js";
import DataTable from "./DataTable";
import useNotification from '../hook/useNotification.js';
import Notification from "./Notification";

const ProfileTable = () => {
    const [profiles, setProfiles] = useState([]);
    const { notification, showNotification } = useNotification();

    const loadProfiles = async () => {
        try {
            const data = await getAllProfiles();
            console.log(data);
            setProfiles(data);
        } catch (error) {
            console.error("Erreur lors du chargement des profils", error);
            showNotification("Une erreur est survenue lors de la récupération des profils", "error");
        }
    };

    useEffect(() => {
        loadProfiles();
    }, []);

    const handleAddNew = async (newProfileData) => {
        if (newProfileData.balance) newProfileData.balance = parseFloat(newProfileData.balance);
        try {
            await addProfile(newProfileData);
            loadProfiles();
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
            loadProfiles();
            showNotification("Profil modifier avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil", error);
            showNotification("Une erreur est survenue lors de la modification ", "error");
        }
    };

    const handleDeleteProfile = async (profile) => {
        try {
            await deleteProfileById(profile.id);
            loadProfiles();
            showNotification("Profil supprimer avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la suppression du profil", error);
            showNotification("Une erreur est survenue lors de la suppression", "error");
        }
    };

    const columns = ["id", "name", "email", "address", "bank_account", "balance"];
    const formFields = ["name", "email", "password", "address", "bank_account", "balance"];

    return (
        <div>
            <DataTable
                data={profiles}
                columns={columns}
                formFields={formFields}
                onAddNew={handleAddNew}
                onUpdateItem={handleUpdateItem}
                onDelete={handleDeleteProfile}
            />
            <Notification notification={notification} />
        </div>
    );
};

export default ProfileTable;