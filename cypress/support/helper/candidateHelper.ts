
import { faker } from '@faker-js/faker';
import { CREATE_VACNCY_API } from "../../support/constants";
import { CREATE_EMPL_API } from "../../support/constants";
import { CREATE_EMPL_BODY } from "../../support/constants";

import { CREATE_CANDIDATE_API } from "../../support/constants";
import { CREATE_CANDIDATE_BODY } from "../../support/constants";


class VacancyHelper {

    create_vacancy(employeeId: Number) {
        return cy.api({
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
                employeeId: employeeId
            }
        }).then((response) => {
            expect(response).property('status').to.equal(200)});

    }


    makeAPICALL(inputMethod: string, inputUrl:string, inputBody:any) {
        return cy.api({
            method: inputMethod,
            url: inputUrl,
            body: inputBody
        }).then((response) => {
            expect(response).property('status').to.equal(200)});

    }

    createEmployeeViaAPI()
    {
        return this.makeAPICALL('POST', CREATE_EMPL_API, CREATE_EMPL_BODY)

    }

    createCandidateViaAPI()
    {
        return this.makeAPICALL('POST', CREATE_CANDIDATE_API, CREATE_CANDIDATE_BODY)

    }

    visitShortlistedCandidate(inputCandidateID)
    {
        return this.makeAPICALL('PUT',
        'web/index.php/api/v2/recruitment/candidates/' + inputCandidateID + '/shortlist',
        {
            note: null
        }
        )

    }
    
}

export default VacancyHelper;