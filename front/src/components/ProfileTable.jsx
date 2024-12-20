import { useContext } from "react";
import { addProfile, deleteProfileById, updateProfile } from "../API/controller/profile.js"; // Assurez-vous d'avoir les bonnes fonctions API
import DataTable from "./DataTable";
import useNotification from '../hook/useNotification.js';
import Notification from "./Notification";
import { DataContext } from "../provider/DataContext";

const ProfileTable = () => {
    const { profiles, loadData } = useContext(DataContext);
    const { notification, showNotification } = useNotification();

    const handleAddNew = async (newProfileData) => {
        if (newProfileData.balance) newProfileData.balance = parseFloat(newProfileData.balance);
        try {
            await addProfile(newProfileData);
            await loadData();
            showNotification("Profil ajouté avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de l'ajout du profil", error);
            showNotification("Une erreur est survenue lors de l'ajout", "error");
        }
    };


    const handleUpdateItem = async (profile, updatedData) => {
        try {
            if (updatedData.balance) updatedData.balance = parseFloat(updatedData.balance);
            if (!updatedData.password || updatedData.password === profile.password) {
                delete updatedData.password;
            }
            await updateProfile(updatedData);
            await loadData();
            showNotification("Profil modifié avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil", error);
            showNotification("Une erreur est survenue lors de la modification", "error");
        }
    };

    const handleDeleteProfile = async (profile) => {
        try {
            await deleteProfileById(profile.id);
            await loadData();
            showNotification("Profil supprimé avec succès !", "success");
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
