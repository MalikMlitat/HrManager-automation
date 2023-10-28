import LoginPage from "../../support/page-objects/LoginPage"

import VacancyHelper from "../../support/helper/candidateHelper";

const loginObj: LoginPage = new LoginPage();
const apisHelper: VacancyHelper = new VacancyHelper();
const emplPassword: string = "thisIsAGood_PWD12";

var createdEmpNumber: Number;
var createdEmpName: string;

var timesheetID: Number;

describe('Employee Functionality', () => {


    beforeEach(function () {
        loginObj.login('Admin', 'admin123')
        apisHelper.createEmployeeViaAPI()
            .then((response) => {
                createdEmpNumber = response.body.data.empNumber;
                createdEmpName = response.body.data.firstName
            })
            .then(() => {
                apisHelper.createUserWithLoginDataViaAPI(createdEmpName, emplPassword, createdEmpNumber)
            })
            .then(() => {
                loginObj.logout_and_login(createdEmpName, emplPassword);
            })
            .then(() => {
                apisHelper.getTimesheetIDviaAPI();
            })
            .then((response) => {
                timesheetID = response.body.data.id 
                apisHelper.addAndSubmitEntryToTimeSheetViaAPI(timesheetID)
            })
            .then(() => {
                loginObj.logout_and_login("Admin", "admin123");
            })
    })




    it('Add Timesheet record by employee', () => {
        cy.visit('/web/index.php/time/viewEmployeeTimesheet');
        cy.get('div').contains(createdEmpName);
    })

});
