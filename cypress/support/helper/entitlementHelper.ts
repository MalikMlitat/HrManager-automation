
import { faker } from '@faker-js/faker';
import { CREATE_VACNCY_API } from "../constants";
import { CREATE_EMPL_API } from "../constants";
import { CREATE_EMPL_BODY } from "../constants";

import { CREATE_CANDIDATE_API } from "../constants";
import { CREATE_CANDIDATE_BODY } from "../constants";


class EntitlementHelper {

    createEntitlementViaAPI(employeeId: Number) {
        return this.makeAPICALL(
             "POST",
             "/web/index.php/api/v2/leave/leave-entitlements",
             {
                empNumber: employeeId,
                leaveTypeId: 6,
                fromDate: "2023-01-01",
                toDate: "2024-08-24",
                entitlement: 6,
            }
        )

    }


    createEmplWithLoginDataViaAPI(createdEmpName: string, createdEmpPWD: string, createdEmpNumber: Number) {
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


    createLeaveRequestViaAPI(leaveTypeId: Number, fromDate: String, toDate: String) {
        return this.makeAPICALL(
            'POST',
            "/web/index.php/api/v2/leave/leave-requests",
            {
                leaveTypeId: leaveTypeId,
                fromDate: fromDate,
                toDate: toDate,
                comment: null,
                duration: {
                    type: "full_day",
                },
            }
        )

    }

    approveEntitlementViaAPI(entitlementID: String) {
        return this.makeAPICALL('PUT',
            `/web/index.php/api/v2/leave/employees/leave-requests/${entitlementID}`,
            {
                action: "APPROVE",
            }
        )

    }
    createEmployeeViaAPI() {
        return this.makeAPICALL('POST', CREATE_EMPL_API, CREATE_EMPL_BODY)

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

    verifyEntitlementStatus(entStatus:String)
    {
        cy.get(":nth-child(1) > .oxd-main-menu-item > .oxd-text").click();
        cy.get(":nth-child(7) > div").should("contain", entStatus);
    }
    




}

export default EntitlementHelper;