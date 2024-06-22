/** @format */

import axios from 'axios';
import queryString from 'query-string';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Token } from '../../models/index.js';
import { checkUserToken } from '../../utils/deleteInValidToken.js';

export const googleRedirect = async (req, res) => {
	const { SECRET_KEY } = process.env;
	const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

	const urlObj = new URL(fullUrl);
	const urlParams = queryString.parse(urlObj.search);
	const code = urlParams.code;
	try {
		const tokenData = await axios({
			url: 'https://oauth2.googleapis.com/token',
			method: 'post',
			data: {
				client_id: process.env.GOOGLE_CLIENT_ID,
				client_secret: process.env.GOOGLE_CLIENT_SECRET,
				redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
				grant_type: 'authorization_code',
				code: code,
			},
		});

		const { data } = await axios({
			url: 'https://www.googleapis.com/oauth2/v2/userinfo',
			method: 'get',
			headers: {
				Authorization: `Bearer ${tokenData.data.access_token}`,
			},
		});

		const user = await User.findOne({ email: data.email });

		const googleUser = !user
			? await User.create({
					name: data.name,
					email: data.email,
					password: await bcrypt.hash(data.id, 10),
			  })
			: user;

		checkUserToken(googleUser._id);

		const token = jwt.sign({ id: googleUser._id }, SECRET_KEY, { expiresIn: '12h' });

		await Token.create({
			userId: googleUser._id,
			token,
		});

		res.redirect(`${process.env.FRONTEND_URL}/google_auth?token=${token}`);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};
