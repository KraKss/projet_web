import { useState, useEffect } from "react";
import {getAllProducts} from "../API/controller/product.js";
import {addProfile, deleteProfileById, updateProfile} from "../API/controller/profile.js"; // Assurez-vous d'avoir les bonnes fonctions API
import DataTable from "./DataTable";
import useNotification from '../hook/useNotification.js';
import Notification from "./Notification";

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const { notification, showNotification } = useNotification();

    const loadProduct = async () => {
        try {
            const data = await getAllProducts();
            console.log(data);
            setProducts(data);
        } catch (error) {
            console.error("Erreur lors du chargement des review", error);
            showNotification("Une erreur est survenue lors de la récupération des review", "error");
        }
    };

    useEffect(() => {
        loadProduct();
    }, []);

    const handleAddNew = async (newProfileData) => {
        if (newProfileData.balance) newProfileData.balance = parseFloat(newProfileData.balance);
        try {
            await addProfile(newProfileData);
            loadProduct();
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
            loadProduct();
            showNotification("Profil modifier avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil", error);
            showNotification("Une erreur est survenue lors de la modification ", "error");
        }
    };

    const handleDeleteProfile = async (profile) => {
        try {
            await deleteProfileById(profile.id);
            loadProduct();
            showNotification("Profil supprimer avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la suppression du profil", error);
            showNotification("Une erreur est survenue lors de la suppression", "error");
        }
    };

    const columns = ["id", "seller_id", "name", "description", "price", "filament_type"];
    const formFields = ["name"];

    return (
        <div>
            <DataTable
                data={products}
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

export default ProductTable;