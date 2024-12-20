import DataTable from './DataTable';
import {useEffect, useState} from "react";
import {getAllProfiles,addProfile} from "../API/TableAPI/ProfileAPI.js";
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
                setProfiles(data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    const columns = ['image','name', 'email', 'id', 'address', 'bank_account', 'balance'];

    const addProfiles = async (newProfile) => {
        try {
            const addProfile1 = await addProfile(newProfile);
            setProfiles((prevProfiles) => [...prevProfiles, addProfile1]);
        } catch (e) {
            console.error("Erreur lors de l'ajout du profil :", e);
        }
    };
    

    return (
        <div>
            <DataTable
                data={profiles}
                columns={columns}
                form={( dataUpdate = null) => {
                    console.log(dataUpdate);
                    return <ProfileForm dataUpdate={dataUpdate} addProfiles={addProfiles}/>}
                }
            />
        </div>
    );
};

export default ProfileTable;