import Router from "express-promise-router";
import {addReview, deleteReviewById, getAllReviews, getReviewBySellerId, updateReview,getReviewByReviewerAndSeller} from "../controller/review.js";
import {manager} from "../middleware/auth/mustBe.js";

/**
 * @swagger
 * components:
 *  schemas:
 *      OrderItem:
 *          type: object
 *          properties:
 *              order_id:
 *                  type: integer
 *                  description: ID of the order
 *              product_id:
 *                  type: integer
 *                  description: ID of the product
 *              quantity:
 *                  type: integer
 *                  description: Quantity of the product in the order
 *  responses:
 *      OrderItemResponse:
 *          description: Details of a specific order item
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/OrderItem'
 *      OrderItemListResponse:
 *          description: List of order items for an order
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/OrderItem'
 *      OrderItemAdded:
 *          description: Order items created successfully
 *      OrderItemUpdated:
 *          description: Order item updated successfully
 *      OrderItemDeleted:
 *          description: Order item deleted successfully
 */

const router = Router();

router.post("/", addReview);
router.patch("/", manager, updateReview);
router.get("/all", getAllReviews);
router.get("/:seller_id", getReviewBySellerId);
router.get("/:reviewer_id/:seller_id", getReviewByReviewerAndSeller);
router.delete("/:reviewer_id/:seller_id", manager, deleteReviewById);


export default router;