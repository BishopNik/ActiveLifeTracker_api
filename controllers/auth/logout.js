/** @format */

import { Token } from '../../models/index.js';

export const logout = async ({ user, token }, res) => {
	const { _id: id } = user;

	await Token.deleteMany({ userId: id, token });

	res.status(204).json({});
};
