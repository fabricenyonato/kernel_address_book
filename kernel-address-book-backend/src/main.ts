import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import contactRouter from './router/contact-router'
import { intiConatiner } from './container'

const port = +(process.env.PORT || 3000)

async function main() {
  await intiConatiner()
	const app = express()

	app.use(bodyParser.json())
	app.use(cors())
	app.use('/contacts', contactRouter)

  app.use((error: any, request: Request, response: Response, next: NextFunction) => {
    if (error === 'ENTITY_NOT_FOUND') {
      response.status(404).json({ error })
    }
    else {
      next(error)
    }
  })

	app.listen(port, () => {
		console.log(`http://localhost:${port}`)
	})
}

main()
.catch(console.error)
