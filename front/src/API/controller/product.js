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

// const updateProfile = async (updatedData) => {
//     try {
//         // Handle password updates
//         if (!updatedData.password || updatedData.password === updatedData.oldPassword) {
//             delete updatedData.password;
//         }
//         if (updatedData.balance) updatedData.balance = parseFloat(updatedData.balance);
//
//         const { data } = await apiClient.patch(`${API_ROUTES.PRODUCT_ROUTE}/`, updatedData);
//         return data;
//     } catch (e) {
//         throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
//     }
// };
//
// const deleteProfileById = async (id) => {
//     try {
//         await apiClient.delete(`${API_ROUTES.PRODUCT_ROUTE}/${id}`);
//     } catch (e) {
//         throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
//     }
// };

export {
    getAllProducts,
    addProduct,
    // updateProfile,
    // deleteProfileById,
};
