
import RecruitmentPage from "../../support/page-objects/RecruitmentPage"
import LoginPage from "../../support/page-objects/LoginPage"

import { rowsCandidateAPI } from "../../support/constants";

const loginObj:LoginPage = new LoginPage();
const recruitment:RecruitmentPage = new RecruitmentPage();

describe('Recruitment Functionality', () => {

   
    beforeEach(function()
    {
        
        loginObj.login('Admin', 'admin123');
        cy.visit('web/index.php/recruitment/viewCandidates');
    })

    it('Match Number of rows between API and UI',() => {
        cy.intercept(rowsCandidateAPI).as('getRows');

        cy.wait('@getRows').then((interception) => {
            // ROWS from API
            const rowsFromAPI = interception.response?.body.meta.total;
            // ROWS from UI
            recruitment.elements.getCandidatesRowNumber()
            // ASSERTION
            .should('have.length', rowsFromAPI);
           
          });
    });
})