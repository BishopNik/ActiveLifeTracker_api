/** @format */

import { httpError } from '../utils/index.js';

export const validateBody = (schema, message) => {
	const func = ({ body }, res, next) => {
		const { error } = schema.validate(body);
		if (error) {
			next(httpError(400, message || error.message));
		}
		next();
	};

	return func;
};
