import DataTable from './DataTable';
import {useEffect, useState} from "react";
import {getProfileByID} from "../API/http.js";
import ProfileForm from "./Form/ProfileForm.jsx";

const ProfileTable = () => {
    const [profiles, setProfiles] = useState([]);

    const loadProfileByID = async (id) => {
        try {
            const data = await getProfileByID(id);
            return data;
        } catch (e) {
            throw new Error('Un problème est survenu, réessayer plus tard: ' + e);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await loadProfileByID(1);
                setProfiles([data]);
                console.log(data);
            } catch (e) {
                console.error(e);
            }
        };

        fetchData();
    }, []);

    const columns = ['name', 'email', 'id', 'address', 'bank_account', 'balance'];

    const addProfile = (newProfile) => {
        setProfiles((prevProfiles) => [
            ...prevProfiles,
            { ...newProfile, id: prevProfiles.length + 1 },
        ]);
    }
    

    return (
        <div>
            <DataTable
                data={profiles}
                columns={columns}
                form={<ProfileForm onSubmit={addProfile} dataUpdate={null} />}
            />
        </div>
    );
};

export default ProfileTable;