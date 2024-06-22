/** @format */

export const calculateBMR = ({
	height,
	currentWeight,
	desiredWeight,
	birthday,
	sex,
	levelActivity,
}) => {
	const age = new Date().getFullYear() - new Date(birthday).getFullYear();
	const activityFactor = {
		1: 1.2,
		2: 1.375,
		3: 1.55,
		4: 1.725,
		5: 1.9,
	}[levelActivity];

	const BMR =
		sex === 'male'
			? (10 * currentWeight + 6.25 * height - 5 * age + 5) * activityFactor
			: (10 * currentWeight + 6.25 * height - 5 * age - 161) * activityFactor;

	// Расчет необходимого изменения калорий для достижения желаемого веса
	const weightDifference = currentWeight - desiredWeight;
	const caloriesForWeightChange = weightDifference * 7700;

	const dailyCalorieAdjustment = caloriesForWeightChange / 30; // Расчет на основе 30-дневного периода
	const dailyCalorieIntake = BMR - dailyCalorieAdjustment;

	return {
		dailyCalorieIntake: dailyCalorieIntake,
		dailySportTime: 110,
	};
};
