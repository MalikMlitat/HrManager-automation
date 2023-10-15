
import SchedulInterview from "../../support/page-objects/scheduleInterview"
import LoginPage from "../../support/page-objects/LoginPage"

import VacancyHelper from "../../support/helper/candidateHelper";

const loginObj: LoginPage = new LoginPage();
const vacancyhelper: VacancyHelper = new VacancyHelper();
const schedulInterview: SchedulInterview = new SchedulInterview();

var createdEmpNumber: Number;
var createdEmpName: String;
var createdVacancyId: Number;
var candidateID: Number;

describe('Employee Functionality', () => {


    beforeEach(function () {
        cy.visit('/web/index.php/auth/login');
        loginObj.login('Admin', 'admin123')
        // this can be moved to helper too, but decided to let it here

        // create user to assign to the created vacancy later
        vacancyhelper.createEmployeeViaAPI()
            .then((response) => {
                createdEmpNumber = response.body.data.empNumber;
                createdEmpName = response.body.data.firstName
            })
            // create vacancy to be assigned to the new candidate
            .then(() => { vacancyhelper.create_vacancy(createdEmpNumber) })
            .then((response) => { createdVacancyId = response.body.data.id })
            // API: create candidate
            .then(() => { vacancyhelper.createCandidateViaAPI() })
            .then((response) => { candidateID = response.body.data.id })
            // API (UserID): per URL change user to shortlisted candidate
            .then(() => { vacancyhelper.visitShortlistedCandidate(candidateID) })
            .then((response) => { expect(response.body.data.action.label).to.equal('Shortlisted'); })
            .then(() => {
                // visit the candidate page
                cy.visit('/web/index.php/recruitment/addCandidate/' + candidateID);
                cy.get('.oxd-button--success').click();
            })
    })

    it('Check schedul interview for candidate', () => {

        // schedul the inteview
        schedulInterview.schedulInterview(createdEmpName);
    })

});
