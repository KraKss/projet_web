import DataTable from './DataTable';
import {useEffect, useState} from "react";
import {getAllProfiles,createProfile} from "../API/TableAPI/ProfileAPI.js";
import ProfileForm from "./Form/ProfileForm.jsx";

const ProfileTable = () => {
    const [profiles, setProfiles] = useState([]);

    const loadProfileByID = async()  => {
        try {
            const data = await getAllProfiles();
            return data;
        } catch (e) {
            throw new Error('Un problème est survenu, réessayer plus tard: ' + e);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await loadProfileByID();
                setProfiles([data]);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    const columns = ['image','name', 'email', 'id', 'address', 'bank_account', 'balance'];

    const addProfile = async (newProfile) => {
        try {
            const createdProfile = await createProfile(newProfile);
            setProfiles((prevProfiles) => [...prevProfiles, createdProfile]);
        } catch (e) {
            console.error("Erreur lors de l'ajout du profil :", e);
        }
    };
    

    return (
        <div>
            <DataTable
                data={profiles}
                columns={columns}
                onSubmit={addProfile}
                form={( dataUpdate = null) => {
                    console.log(dataUpdate);
                    return <ProfileForm dataUpdate={dataUpdate}/>}
                }
            />
        </div>
    );
};

export default ProfileTable;