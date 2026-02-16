import { Router } from 'express';
import { getUsers, getUserById, updateUser, changeUserStatus } from './user.controller.js';
import { userIdValidator, updateUserValidator } from '../../middlewares/user-validators.js';

const router = Router();

router.get('/', getUsers);

router.get('/:id', userIdValidator, getUserById);

router.put('/:id', updateUserValidator, updateUser);

router.patch('/:id/status', userIdValidator, changeUserStatus);

export default router;