import Hapi from '@hapi/hapi'
import * as service from './service'
import routes from './routes'
import { makeChance } from '../../lib/chance'

const server = Hapi.server()
const chance = makeChance()


const fakeGetAll = chance.string()
const fakeGetOne = chance.string()
const fakeDeleteOne = chance.string()
const fakePostOne = chance.string()
const fakePutOne = chance.string()
const fakeSearch = chance.string()


const stubs: Record<string, jest.SpyInstance | jest.Mock> = {}
beforeAll(() => {server.route(routes)
	stubs['getAll'] = jest.spyOn(service, 'getAll')
	stubs['getOne'] = jest.spyOn(service, 'getOne')
	stubs['remove'] = jest.spyOn(service, 'removeTask')
	stubs['create'] = jest.spyOn(service, 'create')
	stubs['update'] = jest.spyOn(service, 'update')
	stubs['search'] = jest.spyOn(service, 'search')
})

beforeEach(() => {
	stubs['getAll'].mockResolvedValue(fakeGetAll)
	stubs['getOne'].mockResolvedValue(fakeGetOne)
	stubs['remove'].mockResolvedValue(fakeDeleteOne)
	stubs['create'].mockResolvedValue(fakePostOne)
	stubs['update'].mockResolvedValue(fakePutOne)
	stubs['search'].mockResolvedValue(fakeSearch)
})

afterAll(() => { jest.restoreAllMocks() })
afterEach(() => { jest.resetAllMocks() })




// Testing route GET
describe ('route GET /', () => {
	const method = 'GET'
	const url = '/'
  
it('exists and calls expected handler', async () => {
	  const res = await server.inject({method, url})
  
	  expect(res.statusCode).toEqual(200)
	  expect(res.result).toEqual(fakeGetAll)
	}) 
})


// Testing route GET ONE
describe('route GET /{id}', () => {
	const id = chance.guid()
	const method = 'GET'
	const url = `/${id}`
	
it('exists and calls expected handler', async () => {
	  const res = await server.inject({method, url})
	
	  expect(res.statusCode).toEqual(200)
	  expect(res.result).toEqual(fakeGetOne)
	})
})

// Testing route DELETE
// describe('route DELETE /{id}', () => {
// 	const id = chance.guid()
// 	const method = 'DELETE'
// 	const url = `/${id}`

// 	it('exists and calls expected handler', async () => {
// 	  const res = await server.inject({method, url})
// 	  expect(res.statusCode).toEqual(200)
// 	  expect(res.result).toEqual(fakeDeleteOne)
// 	})
// })


// Testing route POST
// describe('route POST /', () => {
// 	const method = 'POST'
// 	const url = '/'
// 	const validObj: service.Task = {
// 	  description: chance.string(),
// 	  done: chance.bool(),
// 	  dueDate: chance.date(),
// 	}
// 	it('exists and calls expected handler', async () => {
// 	  const payload = JSON.stringify(validObj)
// 	  const res = await server.inject({method, url, payload})
// 	  expect(res.statusCode).toEqual(201)
// 	  expect(res.result).toEqual(fakePostOne)
// 	})
// 	it('validates payload', async () => {
// 	  const errorObjDescription = {...validObj, description: false}
// 	  const payload = JSON.stringify(errorObjDescription)
// 	  const res = await server.inject({method, url, payload})
// 	  expect(res.statusCode).toEqual(400)
// 	})
// 	it('validates payload', async () => {
// 	  const errorObjDone = {...validObj, done: 'potato'}
// 	  const payload = JSON.stringify(errorObjDone)
  
//   const res = await server.inject({method, url, payload})
// 	  expect(res.statusCode).toEqual(400)
// 	})
// 	it('validates payload', async () => {
// 	  const errorObjDueDate = {...validObj, dueDate: 'potato'}
// 	  const payload = JSON.stringify(errorObjDueDate)
// 	  const res = await server.inject({method, url, payload})
// 	  expect(res.statusCode).toEqual(400)
// 	})
//   })


// Testing route PUT
// describe('route PUT /{id}', () => {
// 	const id = chance.guid()
// 	const method = 'PUT'
// 	const url = `/${id}`
// 	const validObj: service.Task = {
// 	  description: chance.string(),
// 	  done: chance.bool(),
// 	  dueDate: chance.date(),
// 	}
// 	it('exists and calls expected handler', async () => {
// 	  const payload = JSON.stringify(validObj)
// 	  const res = await server.inject({method, url, payload})
// 	  expect(res.statusCode).toEqual(200)
// 	  expect(res.result).toEqual(fakePutOne)
// 	})
// 	it('validates payload', async () => {
// 	  const errorObjDescription = {...validObj, description: false}
// 	  const payload = JSON.stringify(errorObjDescription)
// 	  const res = await server.inject({method, url, payload})
// 	  expect(res.statusCode).toEqual(400)
// 	})
// 	it('validates payload', async () => {
// 	  const errorObjDone = {...validObj, done: 'potato'}
// 	  const payload = JSON.stringify(errorObjDone)
// 	  const res = await server.inject({method, url, payload})
// 	  expect(res.statusCode).toEqual(400)
// 	})
// 	it('validates payload', async () => {
// 	  const errorObjDueDate = {...validObj, dueDate: 'potato'}
// 	  const payload = JSON.stringify(errorObjDueDate)
// 	  const res = await server.inject({method, url, payload})
// 	  expect(res.statusCode).toEqual(400)
// 	})
// })



// Testing route SEARCH GET
// describe('route GET /search', () => {
// 	const method = 'GET'
// 	const url = '/search'
// 	it('exists and calls expected handler', async () => {
// 	  const res = await server.inject({method, url})
// 	  expect(res.statusCode).toEqual(200)
// 	  expect(res.result).toEqual(fakeSearch)
// 	})
// })