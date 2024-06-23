/** @format */

import jwt from 'jsonwebtoken';

export const createToken = user => {
	const { SECRET_KEY } = process.env;
	return jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '4h' });
};

export const verifyToken = token => {
	const { SECRET_KEY } = process.env;
	return jwt.verify(token, SECRET_KEY);
};
