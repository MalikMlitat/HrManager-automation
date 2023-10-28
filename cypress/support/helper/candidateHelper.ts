
import { faker } from '@faker-js/faker';
import { CREATE_VACNCY_API } from "../../support/constants";
import { CREATE_EMPL_API } from "../../support/constants";
import { CREATE_EMPL_BODY } from "../../support/constants";
import { TIMESHEET_API } from "../../support/constants";

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
            expect(response).property('status').to.equal(200)
        });

    }
    addAndSubmitEntryToTimeSheetViaAPI(timesheetID: Number) {
        this.makeAPICALL(
            "PUT",
            TIMESHEET_API + timesheetID + "/entries",
            { "entries": [{ "projectId": 2, "activityId": 11, "dates": { "2023-10-23": { "duration": "09:00" } } }], "deletedEntries": [] }
        ).then(() => {
            this.makeAPICALL(
                "PUT",
                TIMESHEET_API + timesheetID,
                {"action":"SUBMIT"}
            )
        })
    }

    getTimesheetIDviaAPI()
    {
        cy.visit('/web/index.php/time/viewMyTimesheet')
        return cy.api({
            method: "GET",
            url: "/web/index.php/api/v2/time/timesheets/default",
        }).then((response) => {
            expect(response).property('status').to.equal(200)
        });
    }

    makeAPICALL(inputMethod: string, inputUrl: string, inputBody: any) {
        return cy.api({
            method: inputMethod,
            url: inputUrl,
            body: inputBody
        }).then((response) => {
            expect(response).property('status').to.equal(200)
        });

    }

    createEmployeeViaAPI() {
        return this.makeAPICALL('POST', CREATE_EMPL_API, CREATE_EMPL_BODY)

    }

    createCandidateViaAPI() {
        return this.makeAPICALL('POST', CREATE_CANDIDATE_API, CREATE_CANDIDATE_BODY)

    }
    
    createUserWithLoginDataViaAPI(createdEmpName: string, createdEmpPWD: string, createdEmpNumber: Number) {
        return this.makeAPICALL(
            'POST',
            '/web/index.php/api/v2/admin/users',
            {
                "username": createdEmpName,
                "password": createdEmpPWD,
                "status": true,
                "userRoleId": 2,
                "empNumber": createdEmpNumber
            }
        )

    }
    visitShortlistedCandidate(inputCandidateID) {
        return this.makeAPICALL('PUT',
            'web/index.php/api/v2/recruitment/candidates/' + inputCandidateID + '/shortlist',
            {
                note: null
            }
        )

    }

}

export default VacancyHelper;