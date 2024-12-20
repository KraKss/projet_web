import { useState, useEffect } from "react";
import {getOrderItemsByOrderId} from "../API/controller/orderItems.js";
import {addProfile, deleteProfileById, updateProfile} from "../API/controller/profile.js"; // Assurez-vous d'avoir les bonnes fonctions API
import DataTable from "./DataTable";
import useNotification from '../hook/useNotification.js';
import Notification from "./Notification";
import {useParams} from "react-router-dom";

const OrderItemsTable = () => {
    const [orderItems, setOrderItems] = useState([]);
    const { notification, showNotification } = useNotification();
    const {id} = useParams();

    const loadOrderItems = async () => {
        try {
            const data = await getOrderItemsByOrderId(parseInt(id));
            console.log(data);
            setOrderItems(data);
        } catch (error) {
            console.error("Erreur lors du chargement des orderItems", error);
            showNotification("Une erreur est survenue lors de la récupération des orderItems", "error");
        }
    };

    useEffect(() => {
        loadOrderItems();
    }, []);

    const handleAddNew = async (newProfileData) => {
        if (newProfileData.balance) newProfileData.balance = parseFloat(newProfileData.balance);
        try {
            await addProfile(newProfileData);
            loadOrderItems();
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
            loadOrderItems();
            showNotification("Profil modifier avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil", error);
            showNotification("Une erreur est survenue lors de la modification ", "error");
        }
    };

    const handleDeleteProfile = async (profile) => {
        try {
            await deleteProfileById(profile.id);
            loadOrderItems();
            showNotification("Profil supprimer avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la suppression du profil", error);
            showNotification("Une erreur est survenue lors de la suppression", "error");
        }
    };

    const columns = ["order_id", "product_id", "quantity"];
    const formFields = ["name"];

    return (
        <div>
            <DataTable
                data={orderItems}
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

export default OrderItemsTable;