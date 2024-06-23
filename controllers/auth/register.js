/** @format */

import bcrypt from 'bcrypt';
import { User, Token } from '../../models/index.js';
import { httpError, createToken } from '../../utils/index.js';

export const register = async ({ body }, res) => {
	const { email, password } = body;
	const user = await User.findOne({ email });

	if (user) {
		throw httpError(409, 'Email in use');
	}

	const hashPassword = await bcrypt.hash(password, 10);

	const newUser = await User.create({
		...body,
		password: hashPassword,
	});

	const token = createToken(newUser);

	await Token.create({
		userId: newUser._id,
		token: token,
	});

	res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

	res.status(201).json({
		message: 'Register user successful',
		name: user.name,
		email: user.email,
	});
};
