import Router from 'express-promise-router';
import {
    addProfile,
    updateProfile,
    getProfileById,
    getAllProfiles,
    deleteProfileById,
    getProfileByEmail,
    uploadProfileImage
} from '../controller/profile.js';
import {manager} from '../middleware/auth/mustBe.js';
import {upload} from "../middleware/multer/multer.js";

const router = Router();

/**
 * @swagger
 * /profiles:
 *  post:
 *      tags:
 *          - Profile
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ProfileToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/ProfileAdded'
 *          400:
 *              description: Validation error
 *          500:
 *              description: Server error
 */
router.post('/', manager, upload.single('image'), addProfile);

router.post('/upload-image', upload.single('image'), uploadProfileImage);

/**
 * @swagger
 * /profiles:
 *  patch:
 *      tags:
 *          - Profile
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ProfileToUpdate'
 *      responses:
 *          204:
 *              description: Profile updated
 *          400:
 *              description: Validation error
 *          500:
 *              description: Server error
 */
router.patch('/', manager, updateProfile);

/**
 * @swagger
 * /profiles/all:
 *  get:
 *      tags:
 *          - Profile
 *      responses:
 *          200:
 *              $ref: '#/components/responses/ProfileListResponse'
 *          404:
 *              description: No profiles found
 *          500:
 *              description: Server error
 */
router.get('/all', manager, getAllProfiles);

/**
 * @swagger
 * /profiles/{id}:
 *  get:
 *      tags:
 *          - Profile
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Profile ID
 *      responses:
 *          200:
 *              $ref: '#/components/responses/ProfileResponse'
 *          404:
 *              description: Profile not found
 *          500:
 *              description: Server error
 */
router.get('/:id', getProfileById);

router.get('/', getProfileByEmail);

/**
 * @swagger
 * /profiles/{id}:
 *  delete:
 *      tags:
 *          - Profile
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Profile ID
 *      responses:
 *          204:
 *              description: Profile deleted
 *          500:
 *              description: Server error
 */
router.delete('/:id', manager, deleteProfileById);

export default router;
