
import addEmployee from "../../support/page-objects/addEmployee"
import employeeTable from "../../support/page-objects/EmployeeTable"
import LoginPage from "../../support/page-objects/LoginPage"
import VacancyHelper from "../../support/helper/candidateHelper";
const vacancyhelper: VacancyHelper = new VacancyHelper();

var createdEmpNumber: Number;
var createdEmpName: String;

const loginObj:LoginPage = new LoginPage();
const addEmpl:addEmployee = new addEmployee();
const employeeTableaddEmpl:employeeTable = new employeeTable();
var emplID: String;
describe(['my-feature'], 'Employee Functionality', () => { 

   
    beforeEach(function()
    {
        cy.visit('/web/index.php/auth/login');
        loginObj.login('Admin', 'admin123')
    })

    it(['my-feature'], 'Add new employee via UI',() => {
        addEmpl.addNewEmployee("FirstName","secondName","lastName", "tss432g", "mypasss21");
    });

    it('Employee: validate added row valeus when add new Empolyee',() => {   
            // create user to assign to the created vacancy later
            vacancyhelper.createEmployeeViaAPI()
            .then((response) => {
                createdEmpNumber = response.body.data.empNumber;
                createdEmpName = response.body.data.firstName
                cy.visit('/web/index.php/pim/viewEmployeeList')
                employeeTableaddEmpl.validateTableRow('Last Name', 'Baker8954')
            })
    });
})