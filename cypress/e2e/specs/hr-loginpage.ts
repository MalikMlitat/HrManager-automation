import LoginPage from "../page-objects/LoginPage"

const loginObj:LoginPage = new LoginPage();

describe('Login to the Home page', () => { 

   
    beforeEach(function()
    {
        cy.visit('/web/index.php/auth/login');
    })

    it('loginWithValidUserAndPassword',() => { 
        loginObj.login('Admin', 'admin123')
    });

    it('ForgottPassword',() => { 
        loginObj.forgottPassword('Admin')
    });

    it('Verify login', () => {
        loginObj.login('Admin', 'admin123')
        cy.request('/web/index.php/api/v2/dashboard/employees/locations')
        .then((response) => {
            expect(response).property('status').to.equal(200)
        }) // request
    })

    it('create user via api',() => {
        loginObj.login('Admin', 'admin123')
        cy.request(
            {
                method: 'POST',
                url: '/web/index.php/api/v2/admin/users',
                body:
                {
                    "username": "Test@user3-123" + Date.now().toString(),
                    "password": "Test@user1-123",
                    "status": true,
                    "userRoleId": 2,
                    "empNumber": 2
                }
            }
        ).then((response) =>
        {
            expect(response).property('status').to.equal(200)
        }
        ) //then
    });

})
