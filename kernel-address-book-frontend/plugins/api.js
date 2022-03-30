const baseUrl = 'http://192.168.160.3:3000'

async function findAllContacts() {
  const response = await fetch(`${baseUrl}/contacts`)
  return await response.json()
}

async function findOneContact(id) {
  const response = await fetch(`${baseUrl}/contacts/${id}`)
  return await response.json()
}

async function deleteContact(id) {
  await fetch(`${baseUrl}/contacts/${id}`, { method: 'delete' })
}

async function addContact(contact) {
  const response = await fetch(`${baseUrl}/contacts`, {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(contact)
  })

  if (response.status >= 400) {
    throw response
  }

  return await response.json()
}

async function updateContact(id, contact) {
  const { firstName, lastName, email, tel } = contact
  const body = { firstName, lastName, email, tel }

  const response = await fetch(`${baseUrl}/contacts/${id}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  })

  if (response.status >= 400) {
    throw response
  }

  return await response.json()
}

export default (_, inject) => {
  inject('api', {
    all: findAllContacts,
    one: findOneContact,
    delete: deleteContact,
    create: addContact,
    update: updateContact,
  })
}
