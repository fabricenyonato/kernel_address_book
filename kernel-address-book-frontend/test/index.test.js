import { setupTest, get } from '@nuxt/test-utils'

describe('index page', () => {
  setupTest({ server: true })

  it('renders the index page', async () => {
    const { body } = await get('/')

    expect(body).toContain('<h3>Contacts</h3>')
  })

  /* it('go to add page', async () => {
    const page = await createPage('/');

    const btn = page.locator('a[href="/add"]')
    await btn.click()

    const html = await page.innerHTML('body')
    expect(html).toContain('Add new');
  }) */
})
