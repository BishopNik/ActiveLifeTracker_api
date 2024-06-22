/** @format */

import jwt from 'jsonwebtoken';
import { Token } from '../models/index.js';

export async function checkUserToken(userId) {
	const { SECRET_KEY } = process.env;
	const tokens = await Token.find({ userId });

	for (const { token } of tokens) {
		try {
			jwt.verify(token, SECRET_KEY);
		} catch (error) {
			await Token.deleteMany({ token });
		}
	}
}
