const { test, expect, beforeEach, describe } = require('@playwright/test')


const makeNewUserAndLogin = async (page, request)  => {
  await request.post('http://localhost:3003/api/testing/reset')
  await request.post('http://localhost:3003/api/users', {
    data: {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
  })

  await page.goto('http://localhost:5173')
  await expect(page.getByText('Log in to application')).toBeVisible()
  
  // Effettua il login con l'utente creato
  await page.fill('input[name="Username"]', 'mluukkai')
  await page.fill('input[name="Password"]', 'salainen')
  await page.click('button[type="submit"]')

  // Verifica che il login sia andato a buon fine, ad esempio controllando la presenza del nome dell'utente
  await expect(page.getByText('Welcome')).toBeVisible()

}


const makeANewBlog = async (page)  => {
  await expect(page.getByText('Welcome')).toBeVisible()
  await page.click('button:text("New Blog")');
  await page.fill('input[name="title"]', 'New Blog Title')
  await page.fill('input[name="author"]', 'mluukkai')
  await page.fill('input[name="url"]', 'text')
  await page.click('button[type="submit"]')

  await expect(page.getByText('New Blog Title')).toBeVisible()

}



export { makeNewUserAndLogin, makeANewBlog }