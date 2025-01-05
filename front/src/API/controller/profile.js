import apiClient from "../http.js";
import API_ROUTES from "../apiRoutes.js";

const getAllProfiles = async () => {
    try {
        const { data } = await apiClient.get(`${API_ROUTES.PROFILE_ROUTE}/all`);
        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

const addProfile = async (profile) => {
    try {
        const formData = new FormData();
        Object.entries(profile).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const { data } = await apiClient.post(API_ROUTES.PROFILE_ROUTE, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayez plus tard: " + e);
    }
};


const updateProfile = async (updatedData) => {
    try {
        if (!updatedData.password || updatedData.password === updatedData.oldPassword) {
            delete updatedData.password;
        }
        if (updatedData.balance) updatedData.balance = parseFloat(updatedData.balance);

        const { data } = await apiClient.patch(`${API_ROUTES.PROFILE_ROUTE}/`, updatedData);
        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

const deleteProfileById = async (id) => {
    try {
        await apiClient.delete(`${API_ROUTES.PROFILE_ROUTE}/${id}`);
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

export {
    getAllProfiles,
    addProfile,
    updateProfile,
    deleteProfileById,
};
