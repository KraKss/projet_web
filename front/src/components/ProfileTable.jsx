import React, { useState, useEffect } from "react";
import { getProfileByID } from "../API/http.js";
import DataTable from "./DataTable";
import ProfileForm from "./ProfileForm";

const ProfileTable = () => {
    const [profiles, setProfiles] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [currentProfile, setCurrentProfile] = useState(null);

    const loadProfileByID = async (id) => {
        try {
            const data = await getProfileByID(id);
            return data;
        } catch (e) {
            console.error("Un problème est survenu :", e);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await loadProfileByID(1);
                setProfiles([data]);
            } catch (e) {
                console.error(e);
            }
        };

        fetchData();
    }, []);

    const columns = ["image", "name", "email", "id", "address", "bank_account", "balance"];

    const addProfile = (newProfile) => {
        setProfiles((prevProfiles) => [
            ...prevProfiles,
            { ...newProfile, id: prevProfiles.length + 1 },
        ]);
        setIsAdding(false);
    };

    const editProfile = (updatedProfile) => {
        setProfiles((prevProfiles) =>
            prevProfiles.map((profile) =>
                profile.id === updatedProfile.id ? updatedProfile : profile
            )
        );
        setIsAdding(false);
    };

    const handleAdd = () => {
        setCurrentProfile(null);
        setIsAdding(true);
    };

    const handleEdit = (profile) => {
        setCurrentProfile(profile);
        setIsAdding(true);
    };

    return (
        <div>
            <DataTable
                data={profiles}
                columns={columns}
                seeJoinedTable={false}
                onAdd={handleAdd}
                onEdit={handleEdit}
            />
            {isAdding && (
                <ProfileForm
                    dataUpdate={currentProfile}
                    onSubmit={currentProfile ? editProfile : addProfile}
                    onCancel={() => setIsAdding(false)}
                />
            )}
        </div>
    );
};

export default ProfileTable;
