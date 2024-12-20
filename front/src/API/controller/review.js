import apiClient from "../http.js";
import API_ROUTES from "../apiRoutes.js";

const getAllReviews = async () => {
    try {
        const { data } = await apiClient.get(`${API_ROUTES.REVIEW_ROUTE}/all`);
        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

const addReview = async (review) => {
    try {
        if (review.reviewer_id) review.reviewer_id = parseInt(review.reviewer_id);
        if (review.seller_id) review.seller_id = parseInt(review.seller_id);
        if (review.rating) review.rating = parseInt(review.rating);

        if (review.reviewer_profile?.balance) review.reviewer_profile.balance = parseFloat(review.reviewer_profile.balance);
        if (review.seller_profile?.balance) review.seller_profile.balance = parseFloat(review.seller_profile.balance);

        const { data } = await apiClient.post(API_ROUTES.REVIEW_ROUTE, review);
        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

const updateReview = async (updatedData) => {
    try {
        if (updatedData.reviewer_id) updatedData.reviewer_id = parseInt(updatedData.reviewer_id);
        if (updatedData.seller_id) updatedData.seller_id = parseInt(updatedData.seller_id);
        if (updatedData.rating) updatedData.rating = parseInt(updatedData.rating);

        const { data } = await apiClient.patch(`${API_ROUTES.REVIEW_ROUTE}`, updatedData);
        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

const deleteReviewById = async (rev_id, sell_id) => {
    try {
        await apiClient.delete(`${API_ROUTES.REVIEW_ROUTE}/${rev_id}/${sell_id}`);
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

export {
    getAllReviews,
    addReview,
    updateReview,
    deleteReviewById,
};
