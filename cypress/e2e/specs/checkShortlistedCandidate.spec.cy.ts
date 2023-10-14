
import addEmployee from "../../support/page-objects/addEmployee"
import LoginPage from "../../support/page-objects/LoginPage"
import { faker } from '@faker-js/faker';
import { CREATE_EMPL_REQ } from "../../support/constants";

import { CREATE_VACNCY_API } from "../../support/constants";


import { CREATE_CANDIDATE_REQ } from "../../support/constants";

const loginObj: LoginPage = new LoginPage();
const addEmpl: addEmployee = new addEmployee();

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
        cy.api( CREATE_EMPL_REQ ).then((response) => {
            expect(response).property('status').to.equal(200)
            createdEmpNumber = response.body.data.empNumber;
            // create vacancy to be assigned to the new candidate
            cy.api({
                method: 'POST',
                url: CREATE_VACNCY_API,
                body: 
                {
                    name: faker.person.firstName() + " Job Name ",
                    jobTitleId: 22, // JobcategoryId
                    numOfPositions: null,
                    description: "",
                    status: true,
                    isPublished: true,
                    employeeId: createdEmpNumber
                }
            })
        }).then((response) => {
            expect(response.status).to.equal(200);
            createdVacancyId = response.body.data.id;
            // API: create candidate <- save:UserID
            cy.api(CREATE_CANDIDATE_REQ).then((response) => {
                expect(response.status).to.equal(200);
                candidateID = response.body.data.id;
                // API (UserID): per URL change user to shortlisted candidate
                cy.api({
                    method: 'PUT',
                    url: 'web/index.php/api/v2/recruitment/candidates/' + candidateID + '/shortlist',
                    body:
                    {
                        note: null
                    }
                }).then((response) => {
                    expect(response.status).to.equal(200);
                    cy.log(response.body.data.action);

                    expect(response.body.data.action.label).to.equal('Shortlisted');
                })
            })
            // UI: with UserID visit candidate by url -> schedule interview
            // add employee to add as interviewer
            // UI: fill data (scheduler interview data: Interviewer, date...etc.)
            // assertion interview scheduled

        }
        ) //then create user to assign to the created vacancy later

    }) // end of create vacancy to be assigned to the new candidate

});
