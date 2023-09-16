import LoginPage from "../page-objects/LoginPage"

const loginObj:LoginPage = new LoginPage();

describe('Login to the Home page', () => { 

   
    beforeEach(function()
    {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    })

    it('loginWithValidUserAndPassword',() => { 
        loginObj.login('Admin', 'admin123')
    });

    it('ForgottPassword',() => { 
        loginObj.forgottPassword('Admin')
    });

    it('Verify login', () => {
        loginObj.login('Admin', 'admin123')
        cy.request('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/locations')
        .then((response) => {
            expect(response).property('status').to.equal(200)
        }) // request
    })
})
