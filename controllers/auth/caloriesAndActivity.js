/** @format */

import { User } from '../../models/index.js';
import { calculateBMR } from '../../utils/index.js';

export const caloriesAndActivity = async (
	{
		user: { _id },
		body: { height, currentWeight, desiredWeight, birthday, blood, sex, levelActivity },
	},
	res
) => {
	const { dailyCalorieIntake, dailySportTime } = calculateBMR({
		height,
		currentWeight,
		desiredWeight,
		birthday,
		sex,
		levelActivity,
	});

	await User.findByIdAndUpdate(_id, {
		age,
		sex,
		height,
		currentWeight,
		desiredWeight,
		birthday,
		blood,
		levelActivity,
	});

	res.status(200).json({
		dailyCalories: dailyCalorieIntake,
		dailyActivityTime: dailySportTime,
	});
};
