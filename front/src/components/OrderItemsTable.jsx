import { useContext} from "react";
import {addOrderItem, updateOrderItem, deleteOrderItemById} from "../API/controller/orderItems.js";
import DataTable from "./DataTable";
import useNotification from '../hook/useNotification.js';
import Notification from "./Notification";
import { useParams } from "react-router-dom";
import { DataContext } from "../provider/DataContext.jsx";

const OrderItemsTable = () => {
    const { orderItems, loadData } = useContext(DataContext);
    const { notification, showNotification } = useNotification();
    const { id } = useParams();

    const handleAddNew = async (newOrderItem) => {
        try {
            await addOrderItem({ ...newOrderItem, order_id: parseInt(id) });
            await loadData();
            showNotification("OrderItem ajouté avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de l'ajout du OrderItem :", error);
            showNotification("Une erreur est survenue lors de l'ajout", "error");
        }
    };

    const handleUpdateItem = async (orderItem, updatedData) => {
        try {
            await updateOrderItem({ ...orderItem, ...updatedData });
            await loadData();
            showNotification("OrderItem modifié avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du OrderItem :", error);
            showNotification("Une erreur est survenue lors de la modification", "error");
        }
    };

    const handleDeleteOrderItem = async (orderItem) => {
        try {
            await deleteOrderItemById(orderItem.order_id, orderItem.product_id);
            await loadData();
            showNotification("OrderItem supprimé avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la suppression du OrderItem :", error);
            showNotification("Une erreur est survenue lors de la suppression", "error");
        }
    };

    const columns = ["order_id", "product_id", "quantity"];
    const formFields = ["product_id", "quantity"];

    return (
        <div>
            <DataTable
                data={orderItems.filter((item) => item.order_id === parseInt(id))}
                columns={columns}
                formFields={formFields}
                onAddNew={handleAddNew}
                onUpdateItem={handleUpdateItem}
                onDelete={handleDeleteOrderItem}
            />
            <Notification notification={notification} />
        </div>
    );
};

export default OrderItemsTable;
