import { useContext } from "react";
import { addReview, updateReview, deleteReviewById } from "../API/controller/review.js";
import DataTable from "./DataTable";
import useNotification from '../hook/useNotification.js';
import Notification from "./Notification";
import { DataContext } from "../provider/DataContext";

const ReviewTable = () => {
    const { reviews, loadData } = useContext(DataContext);
    const { notification, showNotification } = useNotification();

    const handleAddNew = async (newReviewData) => {
        try {
            await addReview(newReviewData);
            await loadData();
            showNotification("Review ajoutée avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de l'ajout de la review", error);
            showNotification("Une erreur est survenue lors de l'ajout", "error");
        }
    };

    const handleUpdateItem = async (review, updatedData) => {
        try {
            await updateReview({ ...review, ...updatedData });
            await loadData();
            showNotification("Review modifiée avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la review", error);
            showNotification("Une erreur est survenue lors de la modification", "error");
        }
    };

    const handleDeleteReview = async (review) => {
        try {
            await deleteReviewById(review.id);
            await loadData();
            showNotification("Review supprimée avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de la suppression de la review", error);
            showNotification("Une erreur est survenue lors de la suppression", "error");
        }
    };

    const columns = ["reviewer_id", "seller_id", "rating", "comment", "review_date"];
    const formFields = ["reviewer_id", "seller_id", "rating", "comment"];

    return (
        <div>
            <DataTable
                data={reviews}
                columns={columns}
                formFields={formFields}
                onAddNew={handleAddNew}
                onUpdateItem={handleUpdateItem}
                onDelete={handleDeleteReview}
            />
            <Notification notification={notification} />
        </div>
    );
};

export default ReviewTable;
