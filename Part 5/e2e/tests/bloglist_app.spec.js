const { test, expect, beforeEach, describe } = require('@playwright/test')
const { makeNewUserAndLogin, makeANewBlog } = require('./helper')


describe('Can I delete a blog?', () => {
  beforeEach(async ({ page, request }) => {
    await makeNewUserAndLogin(page, request)
    await makeANewBlog(page)
  })

  test('Can I delete a blog?', async ({ page }) => {
    await page.click('button:text("View")');
    await expect(page.getByText('0')).toBeVisible()
    await expect(page.getByText('New Blog Title')).toBeVisible()
    await expect(page.getByText('Author: mluukkai')).toBeVisible()
    await page.click('button:text("Delete blog")');
    await expect(page.getByText('New Blog Title')).not.toBeVisible();
  })
})


/*
describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {

    await expect(page.getByText('Log in to application')).toBeVisible()
  })
})
*/

/*
describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
      
      await request.post('http://localhost:3003/api/testing/reset')
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Matti Luukkainen',
          username: 'mluukkai',
          password: 'salainen'
        }
      })
      await page.goto('http://localhost:5173')
    })

    test('User login is succesfull', async ({ page }) => {
      // Verifica se la pagina di login è visibile (presumendo che l'utente debba loggarsi dopo la creazione)
      await expect(page.getByText('Log in to application')).toBeVisible()
  
      // Effettua il login con l'utente creato
      await page.fill('input[name="Username"]', 'mluukkai')
      await page.fill('input[name="Password"]', 'salainen')
      await page.click('button[type="submit"]')
  
      // Verifica che il login sia andato a buon fine, ad esempio controllando la presenza del nome dell'utente
      await expect(page.getByText('Welcome')).toBeVisible()
    })

    test('User login is not succesfull', async ({ page }) => {
      // Verifica se la pagina di login è visibile (presumendo che l'utente debba loggarsi dopo la creazione)
      await expect(page.getByText('Log in to application')).toBeVisible()
  
      // Effettua il login con l'utente creato
      await page.fill('input[name="Username"]', 'nbhsgdgh')
      await page.fill('input[name="Password"]', 'saladgndgndgninen')
      await page.click('button[type="submit"]')
  
      // Verifica che il login sia andato a buon fine, ad esempio controllando la presenza del nome dell'utente
      await expect(page.getByText('Log in to application')).toBeVisible()
    })

})
*/

/*
describe('When logged in', () => {
  beforeEach(async ({ page, request }) => {
    await makeNewUserAndLogin(page, request)
  })

  test('a new blog can be created', async ({ page }) => {
    await expect(page.getByText('Welcome')).toBeVisible()
    await page.click('button:text("New Blog")');
    await page.fill('input[name="title"]', 'New Blog Title')
    await page.fill('input[name="author"]', 'text')
    await page.fill('input[name="url"]', 'text')
    await page.click('button[type="submit"]')

    await expect(page.getByText('New Blog Title')).toBeVisible()
  })
})
  */

/*
describe('Can like a blog?', () => {
  beforeEach(async ({ page, request }) => {
    await makeNewUserAndLogin(page, request)
    await makeANewBlog(page)
  })

  test('Can like a blog?', async ({ page }) => {
    await page.click('button:text("View")');
    await expect(page.getByText('0')).toBeVisible()
    await page.click('button:text("Add like")');
    await expect(page.getByText('1')).toBeVisible()
  })
})
*/