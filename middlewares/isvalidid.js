/** @format */

import { isValidObjectId } from 'mongoose';

import { httpError } from '../utils/index.js';

export const isValidId = ({ params }, _res, next) => {
	const { columnId, cardId, boardId } = params;

	if (!columnId && !cardId && !boardId) next(httpError(400, `Must be id`));

	if (columnId && !isValidObjectId(columnId)) next(httpError(400, `${columnId} is not valid id`));

	if (cardId && !isValidObjectId(cardId)) next(httpError(400, `${cardId} is not valid id`));

	if (boardId && !isValidObjectId(boardId)) next(httpError(400, `${boardId} is not valid id`));

	next();
};
