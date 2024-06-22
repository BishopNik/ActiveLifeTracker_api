/** @format */

import { Schema, model } from 'mongoose';
import Joi from 'joi';

const productSchema = new Schema(
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

productSchema.post('save', (err, _data, next) => {
	err.status = 400;
	next();
});

export const Product = model('product', productSchema);

export const saveProductSchema = Joi.object({
	product: Joi.string().required().messages({
		'string.base': 'Product ID must be a string',
		'any.required': 'Product ID is a required field',
	}),

	date: Joi.string()
		.pattern(/^\d{2}\/\d{2}\/\d{4}$/)
		.required()
		.messages({
			'string.base': 'Date must be a string',
			'string.pattern.base': 'Date must be in the format dd/mm/YYYY',
			'any.required': 'Date is a required field',
		}),

	amount: Joi.number().min(1).required().messages({
		'number.base': 'Amount must be a number',
		'number.min': 'Amount must be at least 1 g',
		'any.required': 'Amount is a required field',
	}),

	calories: Joi.number().min(1).required().messages({
		'number.base': 'Calories must be a number',
		'number.min': 'Calories must be at least 1',
		'any.required': 'Calories is a required field',
	}),
});
