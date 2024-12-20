import { useState, useEffect } from "react";
import {
    addOrderItem,
    deleteOrderItemById,
    getOrderItemsByOrderId,
    updateOrderItem
} from "../API/controller/orderItems.js";
import {addProfile, deleteProfileById, updateProfile} from "../API/controller/profile.js";
import DataTable from "./DataTable";
import useNotification from '../hook/useNotification.js';
import Notification from "./Notification";
import {useParams} from "react-router-dom";
import * as Yup from "yup";

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

    const handleAddNew = async (newOrderItem) => {
        try {
            await addOrderItem(newOrderItem);
            loadOrderItems();
            showNotification("OrderItem ajouté avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de l'ajout du order item", error);
            showNotification("Une erreur est survenue lors de l'ajout ", "error");
        }
    };

    const handleUpdateItem = async (profile, updatedData) => {
        try {
            if (updatedData.balance) updatedData.balance = parseFloat(updatedData.balance);
            if (!updatedData.password || updatedData.password === profile.password) {
                delete updatedData.password;
            }
            await updateOrderItem(updatedData);
            loadOrderItems();
            showNotification("OrderItem modifier avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du order item", error);
            showNotification("Une erreur est survenue lors de la modification ", "error");
        }
    };

    const handleDeleteOrderItem = async (orderItem) => {
        try {
            await deleteOrderItemById(orderItem.order_id, orderItem.product_id);
            loadOrderItems();
            showNotification("OrderItem supprimer avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la suppression du order item", error);
            showNotification("Une erreur est survenue lors de la suppression", "error");
        }
    };

    const columns = ["order_id", "product_id", "quantity"];
    const formFields = columns;

    const validationSchema = Yup.object().shape({
        quantity: Yup.number().integer("must be entire").required("need it"),
        product_id: Yup.number().integer("must be entire").required("need it"),
        order_id: Yup.number().integer("must be entire").required("need it"),
    });

    return (
        <div>
            <DataTable
                data={orderItems}
                columns={columns}
                formFields={formFields}
                onAddNew={handleAddNew}
                onUpdateItem={handleUpdateItem}
                onDelete={handleDeleteOrderItem}
                validationSchema={validationSchema}
            />
            <Notification notification={notification} />
        </div>
    );
};

export default OrderItemsTable;