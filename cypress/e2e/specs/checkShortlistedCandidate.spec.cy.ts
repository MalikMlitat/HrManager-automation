
import addEmployee from "../../support/page-objects/addEmployee"
import LoginPage from "../../support/page-objects/LoginPage"
import { faker } from '@faker-js/faker';
import { CREATE_EMPL_REQ } from "../../support/constants";

import { CREATE_VACNCY_API } from "../../support/constants";


import { CREATE_CANDIDATE_REQ } from "../../support/constants";

import VacancyHelper from "../../support/helper/candidateHelper";

const loginObj: LoginPage = new LoginPage();
const vacancyhelper: VacancyHelper = new VacancyHelper();

var createdEmpNumber: Number;
var createdVacancyId: Number;
var candidateID: Number;

describe('Employee Functionality', () => {


    beforeEach(function () {
        cy.visit('/web/index.php/auth/login');
        loginObj.login('Admin', 'admin123')
    })

    it('Check schedul interview for candidate', () => {
        // create user to assign to the created vacancy later
        vacancyhelper.createEmployeeViaAPI()
            .then((response) => { createdEmpNumber = response.body.data.empNumber; })
            // create vacancy to be assigned to the new candidate
            .then(() => { vacancyhelper.create_vacancy(createdEmpNumber) })
            // API: create candidate <- save:UserID
            .then((response) => {createdVacancyId = response.body.data.id})
            .then(() => { vacancyhelper.createCandidateViaAPI() })
                    .then((response) => { candidateID = response.body.data.id })
                    // API (UserID): per URL change user to shortlisted candidate
                    .then(() => { vacancyhelper.visitShortlistedCandidate(candidateID) })
                    .then((response) => {
                        expect(response.body.data.action.label).to.equal('Shortlisted');
                    })
            })
        // UI: with UserID visit candidate by url -> schedule interview
        // add employee to add as interviewer
        // UI: fill data (scheduler interview data: Interviewer, date...etc.)
        // assertion interview scheduled
 
});
