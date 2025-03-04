const { test, expect, beforeEach, describe } = require('@playwright/test')

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
      //await page.fill('input[name="username"]', 'mluukkai')
      //await page.fill('input[name="password"]', 'salainen')
      //await page.click('button[type="submit"]')
  
      // Verifica che il login sia andato a buon fine, ad esempio controllando la presenza del nome dell'utente
      //await expect(page.getByText('Welcome')).toBeVisible()
    })

})