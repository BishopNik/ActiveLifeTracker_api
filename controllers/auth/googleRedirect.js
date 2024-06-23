/** @format */

import axios from 'axios';
import queryString from 'query-string';
import bcrypt from 'bcrypt';
import { User, Token } from '../../models/index.js';
import { createToken, checkUserToken } from '../../utils/index.js';

export const googleRedirect = async (req, res) => {
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

		const token = createToken(googleUser);

		await Token.create({
			userId: googleUser._id,
			token,
		});

		res.cookie('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
		});

		res.redirect(`${process.env.FRONTEND_URL}/google_auth`);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};
