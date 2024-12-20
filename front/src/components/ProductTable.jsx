import { useContext } from "react";
import { addProduct, updateProduct, deleteProductById } from "../API/controller/product.js";
import DataTable from "./DataTable";
import useNotification from '../hook/useNotification.js';
import Notification from "./Notification";
import { DataContext } from "../provider/DataContext";

const ProductTable = () => {
    const { products, loadData } = useContext(DataContext);
    const { notification, showNotification } = useNotification();

    const handleAddNew = async (newProductData) => {
        try {
            await addProduct(newProductData);
            await loadData();
            showNotification("Produit ajouté avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de l'ajout du produit :", error);
            showNotification("Une erreur est survenue lors de l'ajout", "error");
        }
    };

    const handleUpdateItem = async (product, updatedData) => {
        try {
            await updateProduct({ ...product, ...updatedData });
            await loadData();
            showNotification("Produit modifié avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du produit :", error);
            showNotification("Une erreur est survenue lors de la modification", "error");
        }
    };

    const handleDeleteProduct = async (product) => {
        try {
            await deleteProductById(product.id);
            await loadData();
            showNotification("Produit supprimé avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la suppression du produit :", error);
            showNotification("Une erreur est survenue lors de la suppression", "error");
        }
    };

    const columns = ["id", "seller_id", "name", "description", "price", "filament_type"];
    const formFields = ["name", "description", "price", "filament_type"];

    return (
        <div>
            <DataTable
                data={products}
                columns={columns}
                formFields={formFields}
                onAddNew={handleAddNew}
                onUpdateItem={handleUpdateItem}
                onDelete={handleDeleteProduct}
            />
            <Notification notification={notification} />
        </div>
    );
};

export default ProductTable;
