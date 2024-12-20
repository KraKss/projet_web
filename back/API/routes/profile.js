import Router from 'express-promise-router';
import {
    addProfile,
    updateProfile,
    getProfileById,
    getAllProfiles,
    deleteProfileById
} from '../controller/profile.js';
import {authBasic} from '../middleware/auth/basic.js';
import {manager} from '../middleware/auth/mustBe.js';

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
router.post('/', manager, addProfile);

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
