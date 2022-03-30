import { setupTest, createPage } from '@nuxt/test-utils'

describe('ssr', () => {
  setupTest({ browser: true })

  it('renders the add page', async () => {
    const page = await createPage('/add');
    const title = page.locator('h3')

    expect(await title.innerText()).toBe('Add new');
  })

  it('complete a valid form', async () => {
    const page = await createPage('/add');

    await page.fill('#first-name', 'Kavani')
    await page.fill('#last-name', 'Akossiwa')
    await page.fill('#tel', '12345678')
    await page.fill('#email', 'akossiwa@kavani.com')

    const btn = page.locator('form button[type="submit"]')
    // const form = page.locator('form')
    // console.log(await form.innerHTML())

    expect(await btn.getAttribute('disabled')).toBe(null);
  })
})
