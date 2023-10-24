import LoginPage from "../../support/page-objects/LoginPage"

const loginObj:LoginPage = new LoginPage();

describe('Login to the Home page', () => { 

   var createdUserID: Number;

    beforeEach(function()
    {
        cy.visit('/web/index.php/auth/login');
        loginObj.login('Admin', 'admin123')

    })

    it('loginWithValidUserAndPassword',() => { 
    });

    it('Verify login', () => {
        cy.request('/web/index.php/api/v2/dashboard/employees/locations')
        .then((response) => {
            expect(response).property('status').to.equal(200)
        }) // request
    })

    it('create user via api',() => {
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
            createdUserID = response.body.data.id;
            cy.log(createdUserID.toString())
        }
        ) //then
    });


      it.only('create user via api and login via UI',() => {
        const createdUserName = "Test@user3-123" + Date.now().toString();
        const createdPWD = "Test@user1-123";
        cy.api(
            {
                method: 'POST',
                url: '/web/index.php/api/v2/admin/users',
                body:
                {
                    "username": createdUserName,
                    "password": createdPWD,
                    "status": true,
                    "userRoleId": 2,
                    "empNumber": 12
                }
            }
        ).then((response) =>
        {
            //expect(response).property('status').to.equal(200)
            cy.log(createdUserName)
            cy.log(createdPWD)
            cy.get('.oxd-userdropdown-name').click().get('.oxd-dropdown-menu').contains('Logout').click();
            //cy.get(':nth-child(4) > .oxd-userdropdown-link').click();
            cy.wait(5000);
            //cy.visit('/web/index.php/auth/login');

            loginObj.login_check_valid_login(createdUserName, createdPWD)
    
    })
})


})
