/** @format */

import { Token } from '../../models/index.js';

export const logout = async ({ user, token }, res) => {
	const { _id: id } = user;

	await Token.deleteMany({ userId: id, token });

	res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

	res.status(204).json({});
};
