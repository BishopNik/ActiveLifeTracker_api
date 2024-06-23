/** @format */

import bcrypt from 'bcrypt';
import { User, Token } from '../../models/index.js';
import { httpError, createToken, checkUserToken } from '../../utils/index.js';

export const login = async ({ body }, res) => {
	const { email, password } = body;

	const user = await User.findOne({ email });

	if (!user) {
		throw httpError(401, 'Email or password is wrong');
	}

	const passwordCompare = await bcrypt.compare(password, user.password);

	if (!passwordCompare) {
		throw httpError(401, 'Email or password is wrong');
	}

	checkUserToken(user._id);

	const token = createToken(user);

	const newToken = new Token({
		userId: user._id,
		token,
	});
	await newToken.save();

	res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

	res.status(201).json({
		message: 'Login user successful',
		name: user.name,
		email: user.email,
	});
};
