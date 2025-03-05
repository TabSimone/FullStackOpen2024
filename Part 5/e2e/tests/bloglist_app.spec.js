const { test, expect, beforeEach, describe } = require('@playwright/test')
const { makeNewUserAndLogin, makeANewBlog } = require('./helper')


describe('Are blog in order?', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await makeNewUserAndLogin(page, request, 'pippo', 'pippo')
    await makeANewBlog(page, "Blog 2", "pluto", "url")
    await makeANewBlog(page, "Blog 1", "pluto", "url")
    await makeANewBlog(page, "Blog 4", "pluto", "url")
    await makeANewBlog(page, "Blog 3", "pluto", "url")
  })

  test('Are blog in order?', async ({ page, request }) => {
    const buttons = page.locator("text=View")  

    buttons.nth(3).click()  

    await page.click('button:text("Add like")');
    await page.click('button:text("Add like")');
    await page.click('button:text("Add like")');
    await page.click('button:text("Add like")');
    await page.click('button:text("Add like")');

    const text1 = page.locator('text=Blog 3');
    const text2 = page.locator('text=Blog 2');

    const position1 = await text1.evaluate(el => el.getBoundingClientRect().top);
    const position2 = await text2.evaluate(el => el.getBoundingClientRect().top);
    
    expect(position1).toBeLessThan(position2);  



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

/*
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
*/

/*
describe('Can I see a delete?', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await makeNewUserAndLogin(page, request, 'pippo', 'pippo')
    await makeANewBlog(page)
  })

  test('Can I see a delete?', async ({ page, request }) => {
    await page.click('button:text("View")');
    await expect(page.getByText('New Blog Title')).toBeVisible()
    await expect(page.getByText('Author: pippo')).toBeVisible()
    await expect(page.getByText('Delete blog')).toBeVisible()
    await page.click('button:text("Logout")');
    await makeNewUserAndLogin(page, request, 'antonio', 'antonio')
    await expect(page.getByText('Welcome')).toBeVisible()
    await page.click('button:text("View")');
    await expect(page.getByText('Delete blog')).not.toBeVisible()
  })
})
*/