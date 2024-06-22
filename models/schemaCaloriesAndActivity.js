/** @format */

import Joi from 'joi';

export const dailyRequirementsSchema = Joi.object({
	height: Joi.number().min(150).required().messages({
		'number.base': 'Height must be a number',
		'number.min': 'Height must be at least 150 cm',
		'any.required': 'Height is a required field',
	}),
	currentWeight: Joi.number().min(35).required().messages({
		'number.base': 'Current weight must be a number',
		'number.min': 'Current weight must be at least 35 kg',
		'any.required': 'Current weight is a required field',
	}),
	desiredWeight: Joi.number().min(35).required().messages({
		'number.base': 'Desired weight must be a number',
		'number.min': 'Desired weight must be at least 35 kg',
		'any.required': 'Desired weight is a required field',
	}),
	birthday: Joi.date()
		.less('now')
		.iso()
		.required()
		.messages({
			'date.base': 'Birthday must be a valid date',
			'date.less': 'Birthday must be in the past',
			'any.required': 'Birthday is a required field',
		})
		.custom((value, helpers) => {
			const age = new Date().getFullYear() - new Date(value).getFullYear();
			if (age < 18) {
				return helpers.message('User must be at least 18 years old');
			}
			return value;
		}),
	blood: Joi.number().valid(1, 2, 3, 4).required().messages({
		'number.base': 'Blood type must be a number',
		'any.only': 'Blood type must be one of [1, 2, 3, 4]',
		'any.required': 'Blood type is a required field',
	}),
	sex: Joi.string().valid('male', 'female').required().messages({
		'string.base': 'Sex must be a string',
		'any.only': 'Sex must be one of ["male", "female"]',
		'any.required': 'Sex is a required field',
	}),
	levelActivity: Joi.number().valid(1, 2, 3, 4, 5).required().messages({
		'number.base': 'Level of activity must be a number',
		'any.only': 'Level of activity must be one of [1, 2, 3, 4, 5]',
		'any.required': 'Level of activity is a required field',
	}),
});
