/** @format */

import { User } from '../../models/index.js';

export const getCurrent = async ({ user }, res) => {
	const { _id } = user;

	const currentUser = await User.findOne({ _id });

	res.json({
		id: currentUser._id,
		name: currentUser.name,
		email: currentUser.email,
	});
};
