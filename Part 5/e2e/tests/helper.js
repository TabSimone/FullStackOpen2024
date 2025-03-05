const { test, expect, beforeEach, describe } = require('@playwright/test')


const makeNewUserAndLogin = async (page, request, name, username)  => {
  await request.post('http://localhost:3003/api/users', {
    data: {
      name: name,
      username: username,
      password: 'password'
    }
  })

  await page.goto('http://localhost:5173')
  await expect(page.getByText('Log in to application')).toBeVisible()
  
  // Effettua il login con l'utente creato
  await page.fill('input[name="Username"]', username)
  await page.fill('input[name="Password"]', 'password')
  await page.click('button[type="submit"]')

  // Verifica che il login sia andato a buon fine, ad esempio controllando la presenza del nome dell'utente
  await expect(page.getByText('Welcome')).toBeVisible()

}


const makeANewBlog = async (page)  => {
  await expect(page.getByText('Welcome')).toBeVisible()
  await page.click('button:text("New Blog")');
  await page.fill('input[name="title"]', 'New Blog Title')
  await page.fill('input[name="author"]', 'pippo')
  await page.fill('input[name="url"]', 'text')
  await page.click('button[type="submit"]')

  await expect(page.getByText('New Blog Title')).toBeVisible()

}



export { makeNewUserAndLogin, makeANewBlog }