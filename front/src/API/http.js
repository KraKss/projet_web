import axios from "axios";

const getProfileByID = async (id) => {
    const rep = await axios.get("http://localhost:3001/api/profile/" + id);
    return rep.data;
};

export { getProfileByID };