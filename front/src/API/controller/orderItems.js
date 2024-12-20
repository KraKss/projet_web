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

const addOrderItem = async (orderItem) => {
    try {
        orderItem.order_id = parseInt(orderItem.order_id);
        orderItem.product_id = parseInt(orderItem.product_id);
        orderItem.quantity = parseInt(orderItem.quantity);
        const payload = { items: [orderItem] };
        const { data } = await apiClient.post(API_ROUTES.ORDER_ITEMS_ROUTE, payload);
        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

const updateOrderItem = async (updatedData) => {
    try {
        updatedData.order_id = parseInt(updatedData.order_id);
        updatedData.product_id = parseInt(updatedData.product_id);
        updatedData.quantity = parseInt(updatedData.quantity);
        const { data } = await apiClient.patch(`${API_ROUTES.ORDER_ITEMS_ROUTE}/`, updatedData);
        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

const deleteOrderItemById = async (orderId, productId) => {
    try {
        await apiClient.delete(`${API_ROUTES.ORDER_ITEMS_ROUTE}/${orderId}/${productId}`);
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

export {
    getOrderItemsByOrderId,
    addOrderItem,
    updateOrderItem,
    deleteOrderItemById,
};
