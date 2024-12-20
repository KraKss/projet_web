import { useState, useEffect } from "react";
import {addOrder, deleteOrderById, getAllOrders, updateOrder} from "../API/controller/order.js";
import DataTable from "./DataTable";
import useNotification from '../hook/useNotification.js';
import Notification from "./Notification";
import {ROUTES} from "../routes/routesPath.js";
import * as Yup from "yup";

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

    const handleAddNew = async (newOrderData) => {
        if (newOrderData.buyer_id) newOrderData.buyer_id = parseInt(newOrderData.buyer_id);
        try {
            await addOrder(newOrderData);
            loadOrders();
            showNotification("Order ajouté avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'order", error);
            showNotification("Une erreur est survenue lors de l'ajout ", "error");
        }
    };

    const handleUpdateItem = async (order, updatedData) => {
        try {
            if (updatedData.buyer_id) updatedData.buyer_id = parseFloat(updatedData.buyer_id);
            updatedData.order_id = order.id;

            await updateOrder(updatedData);
            loadOrders();
            showNotification("Order modifier avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la mise à jour de Order", error);
            showNotification("Une erreur est survenue lors de la modification ", "error");
        }
    };

    const handleDeleteOrder = async (order) => {
        try {
            await deleteOrderById(order.id);
            loadOrders();
            showNotification("Order supprimer avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la suppression de order", error);
            showNotification("Une erreur est survenue lors de la suppression", "error");
        }
    };

    const columns = ["id", "buyer_id", "payment_status", "shipping_status", "order_date"];
    const formFields = ["buyer_id", "payment_status", "shipping_status"];

    const validationSchema = Yup.object().shape({
        shipping_status: Yup.string(),
        payment_status: Yup.string(),
        buyer_id: Yup.number().positive("must be positive").integer("must be entire").required("need it").transform((value, originalValue) => (originalValue === "" ? null : value)),

    });

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
                validationSchema={validationSchema}
            />
            <Notification notification={notification} />
        </div>
    );
};

export default OrderTable;