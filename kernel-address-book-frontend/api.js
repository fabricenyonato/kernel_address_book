const baseUrl = 'http://172.29.0.3:3000'

export async function findAllContacts() {
  const response = await fetch(`${baseUrl}/contacts`)
  return await response.json()
}

export async function findOneContact(id) {
  const response = await fetch(`${baseUrl}/contacts/${id}`)
  return await response.json()
}

export async function deleteContact(id) {
  await fetch(`${baseUrl}/contacts/${id}`, { method: 'delete' })
}

export async function addContact(contact) {
  const data = {
    firstName: contact.firstName,
    lastName: contact.lastName,
    tels: [ contact.tel ],
    emails: [ contact.email ],
  }

  const response = await fetch(`${baseUrl}/contacts`, {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data)
  })

  return await response.json()
}
