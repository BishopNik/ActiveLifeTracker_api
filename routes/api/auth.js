/** @format */

import { Router } from 'express';

import { validateBody, authenticate, isEmptyBody } from '../../middlewares/index.js';
import { registerSchema, loginSchema, dailyRequirementsSchema } from '../../models/index.js';
import {
	register,
	login,
	logout,
	getCurrent,
	googleAuth,
	googleRedirect,
	caloriesAndActivity,
	getInfoUser,
} from '../../controllers/auth/index.js';
import { ctrlWrapper } from '../../utils/index.js';

const authRouter = Router();

//Register
authRouter.post('/register', isEmptyBody, validateBody(registerSchema), ctrlWrapper(register));

// Login
authRouter.post('/login', isEmptyBody, validateBody(loginSchema), ctrlWrapper(login));

// Log out
authRouter.post('/logout', authenticate, ctrlWrapper(logout));

// Refresh
authRouter.get('/current', authenticate, ctrlWrapper(getCurrent));

//Google
authRouter.get('/google', ctrlWrapper(googleAuth));

//Google-Redirect
authRouter.get('/google-redirect', ctrlWrapper(googleRedirect));

//Calories-and-activity
authRouter.post(
	'/calories-and-activity',
	isEmptyBody,
	validateBody(dailyRequirementsSchema),
	authenticate,
	ctrlWrapper(caloriesAndActivity)
);

// Get user info
authRouter.get('/user-info', authenticate, ctrlWrapper(getInfoUser));

export default authRouter;
