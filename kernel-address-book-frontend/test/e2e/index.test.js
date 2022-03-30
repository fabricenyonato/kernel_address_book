import { setupTest, createPage } from '@nuxt/test-utils'

describe('index page', () => {
  setupTest({ browser: true })

  it('renders the index page', async () => {
    const page = await createPage('/')
    const html = await page.innerHTML('body')

    expect(html).toContain('<h3>Contacts</h3>')
  })

  it('go to add page', async () => {
    const page = await createPage('/');

    const btn = page.locator('a[href="/add"]')
    await btn.click()

    const html = await page.innerHTML('body')
    expect(html).toContain('Add new');
  })
})
