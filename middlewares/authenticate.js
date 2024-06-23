/** @format */

import { httpError, verifyToken } from '../utils/index.js';
import { User, Token } from '../models/index.js';

export const authenticate = async (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
		return next(httpError(401, 'Not authorized'));
	}
	const [bearer, token] = authorization.split(' ');
	if (bearer !== 'Bearer') {
		return next(httpError(401, 'Not authorized'));
	}
	try {
		const { id } = verifyToken(token);
		const user = await User.findById(id);
		const tokenData = await Token.findOne({ userId: id, token });

		if (!user || !tokenData) {
			return next(httpError(401, 'Not authorized'));
		}

		req.user = user;
		req.token = token;

		next();
	} catch (error) {
		Token.findByIdAndDelete({ token });
		next(httpError(401, 'Not authorized'));
	}
};
