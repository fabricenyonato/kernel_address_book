import { ContainerBuilder } from 'node-dependency-injection'
import { MongoClient } from 'mongodb'
import ContactRepository from './repository/contact-repository'
import Contact from './entity/contact'

export const container = new ContainerBuilder()

const mongoUri = process.env.MONGO_URI as string
const mongoDatabase = process.env.MONGO_DATABASE as string

export enum ContainerId {
	db = 'service.db',
	contactRepository = 'service.repository.contact',
}

export async function intiConatiner() {
	const mongoClient = await MongoClient.connect(mongoUri)
	const db = mongoClient.db(mongoDatabase)

	// container.register(ContainerId.db, () => db)

	container.register(ContainerId.contactRepository, () => {
    const collection = db.collection<Contact>('contacts')
    return new ContactRepository(collection)
  })
}
