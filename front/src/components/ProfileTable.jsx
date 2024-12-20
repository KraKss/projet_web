import { useState, useEffect } from "react";
import {addProfile, deleteProfileById, getAllProfiles, updateProfile} from "../API/controller/profile.js"; // Assurez-vous d'avoir les bonnes fonctions API
import DataTable from "./DataTable";

const ProfileTable = () => {
    const [profiles, setProfiles] = useState([]);

    const loadProfiles = async () => {
        try {
            const data = await getAllProfiles();
            console.log(data);
            setProfiles(data);
        } catch (error) {
            console.error("Erreur lors du chargement des profils", error);
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
        } catch (error) {
            console.error("Erreur lors de l'ajout du profil", error);
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
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil", error);
        }
    };

    const handleDeleteProfile = async (profile) => {
        try {
            await deleteProfileById(profile.id);
            loadProfiles();
        } catch (error) {
            console.error("Erreur lors de la suppression du profil", error);
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
        </div>
    );
};

export default ProfileTable;