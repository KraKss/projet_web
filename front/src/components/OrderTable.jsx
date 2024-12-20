import { useState, useEffect } from "react";
import {addProfile, deleteProfileById, updateProfile} from "../API/controller/profile.js"; // Assurez-vous d'avoir les bonnes fonctions API
import {getAllOrders} from "../API/controller/order.js";
import DataTable from "./DataTable";
import useNotification from '../hook/useNotification.js';
import Notification from "./Notification";
import {ROUTES} from "../routes/routesPath.js";

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const { notification, showNotification } = useNotification();

    const loadOrders = async () => {
        try {
            const data = await getAllOrders();
            console.log(data);
            setOrders(data);
        } catch (error) {
            console.error("Erreur lors du chargement des orders", error);
            showNotification("Une erreur est survenue lors de la récupération des orders", "error");
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleAddNew = async (newProfileData) => {
        if (newProfileData.balance) newProfileData.balance = parseFloat(newProfileData.balance);
        try {
            await addProfile(newProfileData);
            loadOrders();
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
            loadOrders();
            showNotification("Profil modifier avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil", error);
            showNotification("Une erreur est survenue lors de la modification ", "error");
        }
    };

    const handleDeleteOrder = async (profile) => {
        try {
            await deleteProfileById(profile.id);
            loadOrders();
            showNotification("Profil supprimer avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la suppression du profil", error);
            showNotification("Une erreur est survenue lors de la suppression", "error");
        }
    };

    const columns = ["id", "buyer_id", "payment_status", "shipping_status", "order_date"];
    const formFields = ["buyer_id", "payment_status", "shipping_status"];

    return (
        <div>
            <DataTable
                data={orders}
                columns={columns}
                formFields={formFields}
                onAddNew={handleAddNew}
                onUpdateItem={handleUpdateItem}
                onDelete={handleDeleteOrder}
                seeJoinedTable={{url: `${ROUTES.ORDERS_ITEMS_ROUTE}`}}
            />
            <Notification notification={notification} />
        </div>
    );
};

export default OrderTable;