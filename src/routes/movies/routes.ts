import type {ServerRoute, Request} from '@hapi/hapi'

import { getAll } from './service'



/** Get All Movies
 * @handle `GET /`
 */
const getAllMovies = Object.freeze<ServerRoute>({
  method: 'GET',
  path: '/',
  handler: (req, h) => {
	const mongo = req.mongo
	const offset = Number(req.query.offset) || 0;
	return getAll(mongo, offset);
  }
})









/**
 * Routes of the plugin `movies`
 */
export default [getAllMovies]
