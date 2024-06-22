/** @format */

import { Schema, model } from 'mongoose';
import Joi from 'joi';

const exerciseSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Set name for user'],
		},
		email: {
			type: String,
			match: emailRegexp,
			unique: true,
			required: [true, 'Set email for user'],
		},
		password: {
			type: String,
			minlength: 6,
			required: [true, 'Set password for user'],
		},
		token: {
			type: String,
			default: null,
		},
	},
	{ versionKey: false, timestamps: true }
);

exerciseSchema.post('save', (err, _data, next) => {
	err.status = 400;
	next();
});

export const Exercise = model('exercise', exerciseSchema);

export const saveExerciseSchema = Joi.object({
	exercise: Joi.string().required().messages({
		'string.base': 'Exercise ID must be a string',
		'any.required': 'Exercise ID is a required field',
	}),

	date: Joi.string()
		.pattern(/^\d{2}\/\d{2}\/\d{4}$/)
		.required()
		.messages({
			'string.base': 'Date must be a string',
			'string.pattern.base': 'Date must be in the format dd/mm/YYYY',
			'any.required': 'Date is a required field',
		}),

	time: Joi.number().min(1).required().messages({
		'number.base': 'Time must be a number',
		'number.min': 'Time must be at least 1 minute',
		'any.required': 'Time is a required field',
	}),

	calories: Joi.number().min(1).required().messages({
		'number.base': 'Calories must be a number',
		'number.min': 'Calories must be at least 1',
		'any.required': 'Calories is a required field',
	}),
});
