import { useState, useEffect } from "react";
import {addReview, deleteReviewById, getAllReviews, updateReview} from "../API/controller/review.js";
import DataTable from "./DataTable";
import useNotification from '../hook/useNotification.js';
import Notification from "./Notification";
import * as Yup from "yup";

const ReviewTable = () => {
    const [reviews, setReviews] = useState([]);
    const { notification, showNotification } = useNotification();

    const loadReview = async () => {
        try {
            const data = await getAllReviews();
            console.log(data);
            setReviews(data);
        } catch (error) {
            console.error("Erreur lors du chargement des review", error);
            showNotification("Une erreur est survenue lors de la récupération des review", "error");
        }
    };

    useEffect(() => {
        loadReview();
    }, []);

    const handleAddNew = async (newReviewData) => {
        const { reviewer_id, seller_id, rating, comment, reviewer_profile, seller_profile } = newReviewData;

        const payload = {
            reviewer_id,
            seller_id,
            rating,
            comment,
            ...(reviewer_profile && { reviewer_profile }),
            ...(seller_profile && { seller_profile })
        };

        try {
            await addReview(payload);
            loadReview();
            showNotification("Review ajouté avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de l'ajout du review", error);
            showNotification("Une erreur est survenue lors de l'ajout", "error");
        }
    };


    const handleUpdateItem = async (review, updatedData) => {
        try {
            await updateReview(updatedData);
            loadReview();
            showNotification("Review modifier avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du review", error);
            showNotification("Une erreur est survenue lors de la modification ", "error");
        }
    };

    const handleDeleteReview = async (review) => {
        try {
            await deleteReviewById(review.reviewer_id, review.seller_id);
            loadReview();
            showNotification("Review supprimer avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la suppression du review", error);
            showNotification("Une erreur est survenue lors de la suppression", "error");
        }
    };

    const columns = ["reviewer_id", "seller_id", "rating", "comment", "review_date"];
    const profileFields = ["name", "email", "password", "address", "bank_account", "balance"]
    const formFields = [
        "reviewer_id",
        "seller_id",
        "rating",
        "comment",
        { reviewer_profile: profileFields },
        { seller_profile: profileFields }
    ];

    const validationSchema = Yup.object().shape({
        comment: Yup.string().max(128,"maximum 128 carateres"),
        rating: Yup.number()
            .required("Rating est obligatoire")
            .max(5, "La note ne peut pas dépasser 5")
            .min(0, "La note ne peut pas être negative"),
        seller_id: Yup.number().integer("must be entire").required("Seller id needed"),
        reviewer_id: Yup.number().integer("must be entire").required("Reviewer id needed"),
    });

    return (
        <div>
            <DataTable
                data={reviews}
                columns={columns}
                formFields={formFields}
                onAddNew={handleAddNew}
                onUpdateItem={handleUpdateItem}
                onDelete={handleDeleteReview}
                validationSchema={validationSchema}
            />
            <Notification notification={notification} />
        </div>
    );
};

export default ReviewTable;