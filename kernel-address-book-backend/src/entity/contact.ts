import { ObjectId } from 'mongodb'

export default interface Contact {
	_id?: ObjectId
	firstName: string
	lastName: string
	emails: string[]
	tels: string[]
	createdAt?: Date
	lastUpdatedAt?: Date|null
	deleted?: boolean
}
