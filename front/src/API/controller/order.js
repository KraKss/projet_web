import apiClient from "../http.js";
import API_ROUTES from "../apiRoutes.js";

const getAllOrders = async () => {
    try {
        const { data } = await apiClient.get(`${API_ROUTES.ORDER_ROUTE}/all`);
        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

const addOrder = async (order) => {
    try {
        if (order.buyer_id) order.balance = parseFloat(order.balance);
        const { data } = await apiClient.post(API_ROUTES.ORDER_ROUTE, order);
        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

const updateOrder = async (updatedData) => {
    try {
        if (updatedData.order_id) updatedData.order_id = parseFloat(updatedData.order_id);
        if (updatedData.buyer_id) updatedData.buyer_id = parseFloat(updatedData.buyer_id);
        console.log(updatedData.order_id);
        console.log(updatedData.buyer_id);
        console.log(updatedData.payment_status);
        console.log(updatedData.shipping_status);
        const { data } = await apiClient.patch(`${API_ROUTES.ORDER_ROUTE}/`, updatedData);
        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

const deleteOrderById = async (id) => {
    try {
        await apiClient.delete(`${API_ROUTES.ORDER_ROUTE}/${id}`);
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

export {
    getAllOrders,
    addOrder,
    updateOrder,
    deleteOrderById,
};
