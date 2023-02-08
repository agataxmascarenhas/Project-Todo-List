import { HapiMongo } from "hapi-mongodb"
import { z } from "zod";


export const getAll = async (mongo: HapiMongo) => mongo.db
.collection('Todo-List')
.find({})
.toArray()


export const getOne = async (mongo: HapiMongo, id: string) => mongo.db
.collection('Todo-List')
.findOne({_id: new mongo.ObjectID(id)},{projection:{description:1}})


export const removeTask = async (mongo: HapiMongo, id: string) => mongo.db
.collection('Todo-List')
.deleteOne({_id: new mongo.ObjectID(id)})


/** Zod schema to validate one object with description */
export const Task = z.object({
	description: z.string(),
	done: z.boolean(),
	dueDate: z.coerce.date(),
	// year: z.number().int().min(1890),
  })
export type Task = z.infer<typeof Task>

// Add a new task to the database POST
export const create = (mongo: HapiMongo, task: Task) => mongo.db
.collection('Todo-List')
.insertOne(task)


// Update a task to the database PUT
export const update = (mongo: HapiMongo, id: string, task: Task) => mongo.db
.collection('Todo-List')
.updateOne({_id: new mongo.ObjectID(id)}, {$set: task})

//Search database tasks GET
export const search = (mongo: HapiMongo, query: string) => mongo.db
  .collection('Todo-List')
  .aggregate([
    {
      $searchBeta: {
        search: {
          query: query,
          path: 'description',
        },
      },
    },
    {$project: projection},
    {$limit: 10},
  ]).toArray()


  // const projection = {description: 1}
const projection = Object.fromEntries(
  Object.keys(Task.shape)
    .map(k => [k, 1]),
)