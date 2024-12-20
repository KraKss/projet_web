import { useContext } from "react";
import { addOrder, deleteOrderById, updateOrder } from "../API/controller/order.js";
import DataTable from "./DataTable";
import useNotification from "../hook/useNotification.js";
import Notification from "./Notification";
import { ROUTES } from "../routes/routesPath.js";
import { DataContext } from "../provider/DataContext";

const OrderTable = () => {
    const { orders, loadData } = useContext(DataContext);
    const { notification, showNotification } = useNotification();

    const handleAddNew = async (newOrderData) => {
        try {
            await addOrder(newOrderData);
            await loadData();
            showNotification("Commande ajoutée avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de l'ajout de la commande :", error);
            showNotification("Une erreur est survenue lors de l'ajout", "error");
        }
    };

    const handleUpdateItem = async (order, updatedData) => {
        try {
            console.log("Données mises à jour :", updatedData);
            await updateOrder(updatedData);
            await loadData();
            showNotification("Commande modifiée avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la commande :", error);
            showNotification("Une erreur est survenue lors de la modification", "error");
        }
    };

    const handleDeleteOrder = async (order) => {
        try {
            await deleteOrderById(order.id);
            await loadData();
            showNotification("Commande supprimée avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la suppression de la commande :", error);
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
                seeJoinedTable={{ url: `${ROUTES.ORDERS_ITEMS_ROUTE}` }}
            />
            <Notification notification={notification} />
        </div>
    );
};

export default OrderTable;
