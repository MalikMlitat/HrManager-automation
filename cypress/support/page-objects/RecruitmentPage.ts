import { BASE_URL } from "../constants";

class RecruitmentPage {

    elements =
        {
            getCandidatesRowNumber: () => cy.get('.oxd-table-body').children(),

        }
        

}

export default RecruitmentPage;