import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';

const sendForm = async (route, formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/${route}`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
        return response.data;
    } catch (error) {
        console.error('Error sending form data:', error);
        throw error;
    }
};

export { sendForm };
