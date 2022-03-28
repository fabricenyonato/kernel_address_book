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
  emails: Joi.array()
    .items(Joi.string().email().required())
    .min(1)
    .required(),
  tels: Joi.array()
    .items(Joi.string().pattern(new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')).required())
    .min(1)
    .required(),
})

router.post('/', validator(postSchema), route(async (request, response) => {
  const contactRepository =
  	container.get<ContactRepository>(ContainerId.contactRepository)

	const contact: Contact = request.body
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

const pathSchema = Joi.object().keys({
  firstName: Joi.string(),
  lastName: Joi.string(),
  emails: Joi.array()
    .items(Joi.string().email()),
  tels: Joi.array()
    .items(Joi.string().pattern(new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'))),
})

router.patch('/:id', validator(pathSchema), route(async (request, response, next) => {
  const contactRepository =
  	container.get<ContactRepository>(ContainerId.contactRepository)

	const { id } = request.params
	const body = request.body as Contact

  const contact = await contactRepository.update(id, body)
  response.json(contact)
}))

export default router
