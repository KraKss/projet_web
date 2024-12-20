import apiClient from "../http.js";
import API_ROUTES from "../apiRoutes.js";

const getOrderItemsByOrderId = async (id) => {
    try {
        const { data } = await apiClient.get(`${API_ROUTES.ORDER_ITEMS_ROUTE}/${id}`);
        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

// const addProfile = async (profile) => {
//     try {
//         if (profile.balance) profile.balance = parseFloat(profile.balance);
//         const { data } = await apiClient.post(API_ROUTES.PROFILE_ROUTE, profile);
//         return data;
//     } catch (e) {
//         throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
//     }
// };
//
// const updateProfile = async (updatedData) => {
//     try {
//         // Handle password updates
//         if (!updatedData.password || updatedData.password === updatedData.oldPassword) {
//             delete updatedData.password;
//         }
//         if (updatedData.balance) updatedData.balance = parseFloat(updatedData.balance);
//
//         const { data } = await apiClient.patch(`${API_ROUTES.PROFILE_ROUTE}/`, updatedData);
//         return data;
//     } catch (e) {
//         throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
//     }
// };
//
// const deleteProfileById = async (id) => {
//     try {
//         await apiClient.delete(`${API_ROUTES.PROFILE_ROUTE}/${id}`);
//     } catch (e) {
//         throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
//     }
// };

export {
    getOrderItemsByOrderId,
    // addProfile,
    // updateProfile,
    // deleteProfileById,
};
