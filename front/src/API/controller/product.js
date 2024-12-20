import apiClient from "../http.js";
import API_ROUTES from "../apiRoutes.js";

const getAllProducts = async () => {
    try {
        const { data } = await apiClient.get(`${API_ROUTES.PRODUCT_ROUTE}/all`);
        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

const addProduct = async (product) => {
    try {
        if (product.seller_id) product.seller_id = parseInt(product.seller_id);
        if (product.price) product.price = parseFloat(product.price);
        if (product.filament_type) product.filament_type = parseInt(product.filament_type);
        const { data } = await apiClient.post(API_ROUTES.PRODUCT_ROUTE, product);
        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

const updateProduct = async (updatedData) => {
    try {
        if (updatedData.seller_id) updatedData.seller_id = parseInt(updatedData.seller_id);
        if (updatedData.price) updatedData.price = parseFloat(updatedData.price);
        if (updatedData.filament_type) updatedData.filament_type = parseInt(updatedData.filament_type);
        const { data } = await apiClient.patch(`${API_ROUTES.PRODUCT_ROUTE}/`, updatedData);
        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

const deleteProductById = async (id) => {
    try {
        await apiClient.delete(`${API_ROUTES.PRODUCT_ROUTE}/${id}`);
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

export {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProductById,
};
