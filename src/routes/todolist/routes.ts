import type {ServerRoute, Request} from '@hapi/hapi'

import { getAll, getOne, removeTask} from './service'
import { Task } from './service'
import { create } from './service'


/** Get All Tasks
 * @handle `GET /`
 */
const getAllTasks = Object.freeze<ServerRoute>({
	method: 'GET',
	path: '/',
	handler: (req, _h) => {
		const mongo = req.mongo
	return getAll(mongo)
	}
})

/** Get One Task
 * @handle `GET /{id}`
 */
const getOneTask = Object.freeze<ServerRoute>({
	method: 'GET',
	path: '/{id}',
	handler: (req, _h) => {
		const mongo = req.mongo
		const id = req.params.id
	return getOne(mongo, id)
	}
})



/** Add a new task to the database
 * @handle `POST /`
 */
const postTask = Object.freeze<ServerRoute>({
	method: 'POST',
	path: '/',
  	options: {
    	validate: {
      	payload: (v: unknown) => Task.parseAsync(v),
    	},
  	},
  handler: async (req: Request<{Payload: Task}>, h) => {
    // get data from request
    const mongo = req.mongo
    const task = req.payload

    // call handler (request-agnostic)
    const res = await create(mongo, task)
    return h.response(res)
      .code(201)
      .header('location', `${req.url}/${res.insertedId}`)

    // refer to https://www.rfc-editor.org/rfc/rfc9110.html#name-location
  },
})

/**
 * Delete a task from the database
 * @handle `DELETE /{id}`
 */
const deleteTask = Object.freeze<ServerRoute>({
	method: 'DELETE',
	path: '/{id}',
	handler: async (req, _h) => {
		const mongo = req.mongo
		const id = req.params.id
	return removeTask(mongo, id)
	}
})




/**
 * Routes of the plugin `todolist`
 */
export default [getAllTasks, getOneTask, deleteTask, postTask]
