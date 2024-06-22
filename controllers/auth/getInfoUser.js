/** @format */

export const getInfoUser = async ({ user: { _id } }, res) => {
	const {
		_id: id,
		name,
		email,
		age,
		sex,
		height,
		currentWeight,
		desiredWeight,
		birthday,
		blood,
		levelActivity,
	} = await User.findOne({ _id });

	res.json({
		id,
		name,
		email,
		age,
		sex,
		height,
		currentWeight,
		desiredWeight,
		birthday,
		blood,
		levelActivity,
	});
};
