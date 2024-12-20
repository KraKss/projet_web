import apiClient from "../http.js";

const getAllProfiles = async () => {
    try {
        const { data } = await apiClient.get("/profile/all");
        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
}

const getProfileById = async (id) => {
    try {
        const { data } = await apiClient.get(`/profiles/${id}`);
        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
}

const addProfile = async (profile) => {
    try {
        const { data } = await apiClient.post("/profile", profile);
        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
}


const updateProfile = async (profile) => {
    try {
        const { data } = await apiClient.put(`/profiles/${profile.id}`, profile);
        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
}

const deleteProfileById = async (id) => {
    try {
        await apiClient.delete(`/profiles/${id}`);
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
}

export {
    getAllProfiles,
    getProfileById,
    addProfile,
    updateProfile,
    deleteProfileById,
}