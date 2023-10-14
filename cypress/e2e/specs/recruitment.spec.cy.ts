
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
        // ROWS from UI
        cy.intercept(rowsCandidateAPI).as('getRows');

        cy.wait('@getRows').then((interception) => {
            const rowsFromAPI = interception.response?.body.meta.total;
            recruitment.elements.getCandidatesRowNumber().should('have.length', rowsFromAPI);
           
          });
    });
})