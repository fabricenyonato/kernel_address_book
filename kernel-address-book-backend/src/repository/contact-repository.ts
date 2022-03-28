import { Collection, ObjectId } from 'mongodb'
import Contact from '../entity/contact';

export default class ContactRepository {
	constructor(private collection: Collection<Contact>) {}

  async create(contact: Contact): Promise<Contact>  {
    const doc: Contact = {
      ...contact,
      createdAt: new Date(),
      lastUpdatedAt: null,
      deleted: false,
    }

    await this.collection.insertOne(doc)
    return doc
  }

  async findAll(): Promise<Contact[]>  {
    return await this.collection
      .find({ deleted: false })
      .toArray()
  }

  async delete(id: string): Promise<void>  {
    await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { deleted: true } },
    )
  }

  async findOne(id: string): Promise<Contact>  {
    const contact = await this.collection.findOne({
      _id: new ObjectId(id),
      deleted: false
    })

    if (contact === null) {
      return Promise.reject('ENTITY_NOT_FOUND')
    }

    return contact
  }

  async update(id: string, contact: Contact): Promise<Contact>  {
    const item = await this.findOne(id)

    const $set: Contact = {
      ...contact,
      lastUpdatedAt: new Date()
    }

    await this.collection.updateOne(
      { _id: item._id },
      { $set },
    )

    return { ...item, ...$set }
  }
}
