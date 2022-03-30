import { setupTest, get } from '@nuxt/test-utils'

describe('ssr', () => {
  setupTest({ server: true })

  it('renders the add page', async () => {
    const { body } = await get('/')

    expect(body).toContain('Add new')
  })

  /* it('complete a valid form', async () => {
    const page = await createPage('/add');

    await page.fill('#first-name', 'Kavani')
    await page.fill('#last-name', 'Akossiwa')
    await page.fill('#tel', '12345678')
    await page.fill('#email', 'akossiwa@kavani.com')

    const btn = page.locator('form button[type="submit"]')

    expect(await btn.getAttribute('disabled')).toBe(null);
  }) */
})
