import { useState, useEffect } from "react";
import {addProduct, deleteProductById, getAllProducts, updateProduct} from "../API/controller/product.js";
import DataTable from "./DataTable";
import useNotification from '../hook/useNotification.js';
import Notification from "./Notification";
import * as Yup from "yup";

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

    const handleAddNew = async (newProductData) => {
        try {
            await addProduct(newProductData);
            loadProduct();
            showNotification("Product ajouté avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de l'ajout du product", error);
            showNotification("Une erreur est survenue lors de l'ajout ", "error");
        }
    };

    const handleUpdateItem = async (product, updatedData) => {
        try {
            await updateProduct(updatedData);
            loadProduct();
            showNotification("Product modifier avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du product", error);
            showNotification("Une erreur est survenue lors de la modification ", "error");
        }
    };

    const handleDeleteProduct = async (product) => {
        try {
            await deleteProductById(product.id);
            loadProduct();
            showNotification("Product supprimer avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la suppression du product", error);
            showNotification("Une erreur est survenue lors de la suppression", "error");
        }
    };

    const columns = ["id", "seller_id", "name", "description", "price", "filament_type"];
    const formFields = ["seller_id", "name", "description", "price", "filament_type"];

    const validationSchema = Yup.object().shape({
        filament_type: Yup.number(),
        price: Yup.number().positive().required('Price is required'),
        description: Yup.string().nullable().max(1024, 'Maximum 1024 characters '),
        name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
        seller_id: Yup.number().required("There must be a seller").positive("must be positive").integer("must be entire")
    });

    return (
        <div>
            <DataTable
                data={products}
                columns={columns}
                formFields={formFields}
                onAddNew={handleAddNew}
                onUpdateItem={handleUpdateItem}
                onDelete={handleDeleteProduct}
                validationSchema={validationSchema}
            />
            <Notification notification={notification} />
        </div>
    );
};

export default ProductTable;