import { HapiMongo } from "hapi-mongodb"
import { z } from "zod";


export const getAll = async (mongo: HapiMongo) => mongo.db
.collection('Todo-List')
.find({})
.toArray()


export const getOne = async (mongo: HapiMongo, id: string) => mongo.db
.collection('Todo-List')
.findOne({_id: new mongo.ObjectID(id)},{projection:{description:1}})


// export const createTask = async (mongo: HapiMongo, payload: Payload) => mongo.db
// .collection('Todo-List')
// .insertOne(payload)


export const removeTask = async (mongo: HapiMongo, id: string) => mongo.db
.collection('Todo-List')
.deleteOne({_id: new mongo.ObjectID(id)})


/** Zod schema to validate one object with description */
export const Task = z.object({
	description: z.string(),
	// year: z.number().int().min(1890),
  })
export type Task = z.infer<typeof Task>

export const create = (mongo: HapiMongo, movie: Task) => mongo.db
  .collection('Todo-List')
  .insertOne(Task)