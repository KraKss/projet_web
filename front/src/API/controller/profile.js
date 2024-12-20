import apiClient from "../http.js";

const getAllProfiles = async () => {
    try {
        const { data } = await apiClient.get("/profile/all");
        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

const addProfile = async (profile) => {
    try {
        if (profile.balance) profile.balance = parseFloat(profile.balance);
        const { data } = await apiClient.post("/profile", profile);
        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

const updateProfile = async (updatedData) => {
    try {
        // Handle password updates
        if (!updatedData.password || updatedData.password === updatedData.oldPassword) {
            delete updatedData.password;
        }
        if (updatedData.balance) updatedData.balance = parseFloat(updatedData.balance);

        const { data } = await apiClient.patch(`/profile/`, updatedData);
        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

const deleteProfileById = async (id) => {
    try {
        await apiClient.delete(`/profile/${id}`);
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
