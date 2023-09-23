
import addEmployee from "../../support/page-objects/addEmployee"
import LoginPage from "../../support/page-objects/LoginPage"

const loginObj:LoginPage = new LoginPage();
const addEmpl:addEmployee = new addEmployee();

describe('Employee Functionality', () => { 

   
    beforeEach(function()
    {
        cy.visit('/web/index.php/auth/login');
        loginObj.login('Admin', 'admin123')
    })

    it('Add new employee via UI',() => {
        addEmpl.addNewEmployee("FirstName","secondName","lastName", "tss432g", "mypasss21");
    });
})