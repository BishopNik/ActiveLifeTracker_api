/** @format */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User, Token } from '../../models/index.js';
import { httpError } from '../../utils/index.js';

export const register = async ({ body }, res) => {
	const { SECRET_KEY } = process.env;
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

	const payload = {
		id: newUser._id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' });

	await Token.create({
		userId: newUser._id,
		token: token,
	});

	res.status(201).json({
		token: token,
		user: {
			name: newUser.name,
			email: newUser.email,
		},
	});
};
