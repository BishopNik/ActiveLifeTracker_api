/** @format */

import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRouter from './routes/api/auth.js';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: 'json' };

dotenv.config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Api-docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Auth
app.use('/api/auth', authRouter);

app.use((_req, res) => {
	res.status(404).json({ message: 'Not found' });
});

app.use((err, _req, res, next) => {
	const { status = 500, message = 'Server error' } = err;
	res.status(status).json({ message });
});

export default app;
