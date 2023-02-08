import type {ServerRoute, Request} from '@hapi/hapi'

import { getAll, getOne, removeTask} from './service'
import { Task } from './service'
import { create } from './service'
import { update } from './service'
import { search } from './service'


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
 * Replace a task
 * @handle `PUT /{id}`
 */
const putTask = Object.freeze<ServerRoute>({
	method: 'PUT',
	path: '/{id}',
	options: {
	  validate: {
		payload: (v: unknown) => Task.parseAsync(v),
	  },
	},
	handler: async (req: Request<{Payload: Task}>, h) => {
	  // get data from request
	  const mongo = req.mongo
	  const id = req.params.id
	  const task = req.payload
  
	  // call handler (request-agnostic)
	  return update(mongo, id, task)
	},
})

/**
 * Get all tasks
 * @handle `GET /search`
 */
const getSearch = Object.freeze<ServerRoute>({
	method: 'GET',
	path: '/search',
	handler: async (req, _h) => {
	  // get data from request
	  const mongo = req.mongo
	  const term = req.query.term
  
	  // call handler (request-agnostic)
	  return search(mongo, term)
	},
  })



/**
 * Routes of the plugin `todolist`
 */
export default [getAllTasks, getOneTask, deleteTask, postTask, putTask, getSearch]
