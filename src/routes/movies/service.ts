import { HapiMongo } from "hapi-mongodb"

export const getAll = async (mongo: HapiMongo, offset: number) => mongo.db
.collection('movies')
.find({})
.sort({metacritic:-1})
.skip(offset)
.limit(20)
.toArray();

