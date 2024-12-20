import apiClient from "../http.js";
import API_ROUTES from "../apiRoutes.js";

const requestLogin = async (email, password) => {
    try {
        const { data } = await apiClient.post(`${API_ROUTES.LOGIN_ROUTE}`,
            {
                email, password
            });
        return data;
    } catch (e) {
        throw new Error("Une erreur est survenue, réessayer plus tard: " + e);
    }
};

export default requestLogin;