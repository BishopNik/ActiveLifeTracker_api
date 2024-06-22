/** @format */

const codeHttpError = {
	400: 'Bad Request',
	401: 'Unauthorized',
	402: 'Payment Required',
	403: 'Forbidden',
	404: 'Not Found',
	405: 'Method Not Allowed',
	406: 'Not Acceptable',
	407: 'Proxy Authentication Required',
	408: 'Request Timeout',
	409: 'Conflict',
};

export const httpError = (status, message = codeHttpError[status]) => {
	const error = new Error(message);
	error.status = status;
	return error;
};
