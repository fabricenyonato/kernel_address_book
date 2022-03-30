import { Router, Request, Response, NextFunction } from 'express'
import Joi, { Schema } from 'joi'
import { container, ContainerId } from '../container'
import Contact from '../entity/contact'
import ContactRepository from '../repository/contact-repository'

function route(callback: (request: Request, response: Response, next: NextFunction) => void | Promise<void>) {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      callback(request, response, next)
    }
    catch (error) {
      next(error)
    }
  }
}

function validator(schema: Schema) {
  return (request: Request, response: Response, next: NextFunction) => {
    const body = request.body
    const { error } = schema.validate(body)

    if (!error) {
      next()
    }
    else {
      const { details } = error
      response.status(400).json(details.map(i => i.message))
    }
  }
}

const router = Router()

router.get('/', route(async (request, response) => {
  const contactRepository =
  	container.get<ContactRepository>(ContainerId.contactRepository)

  const contacts = await contactRepository.findAll()
  response.json(contacts)
}))

const postSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  tel: Joi.string().required(),
})

router.post('/', validator(postSchema), route(async (request, response) => {
  const contactRepository =
  	container.get<ContactRepository>(ContainerId.contactRepository)

  const { firstName, lastName, email, tel } = request.body
  const contact: Contact = { firstName, lastName, email, tel }
  const newContact = await contactRepository.create(contact)

  response.status(201).json(newContact)
}))

router.delete('/:id', route(async (request, response) => {
  const contactRepository =
  	container.get<ContactRepository>(ContainerId.contactRepository)

	const { id } = request.params
  await contactRepository.delete(id)

  response.status(204).json()
}))

router.get('/:id', route(async (request, response) => {
  const contactRepository =
  	container.get<ContactRepository>(ContainerId.contactRepository)

	const { id } = request.params
  const item = await contactRepository.findOne(id)

  response.json(item)
}))

router.patch('/:id', validator(postSchema), route(async (request, response, next) => {
  const contactRepository =
  	container.get<ContactRepository>(ContainerId.contactRepository)

	const { id } = request.params
	const { firstName, lastName, email, tel } = request.body as Contact
  const body: Contact = { firstName, lastName, email, tel }

  const contact = await contactRepository.update(id, body)
  response.json(contact)
}))

export default router
