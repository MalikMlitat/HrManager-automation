
import VacancyHelper from "../../support/helper/candidateHelper";

import LoginPage from "../../support/page-objects/LoginPage"

import { CREATE_EMPL_BODY } from "../../support/constants";

const loginObj: LoginPage = new LoginPage();
const vacancyhelper: VacancyHelper = new VacancyHelper();


describe('Entitlement TCs', () => {
    var createdEmpNumber: Number;
    var createdEmpName: string;
    var entitlementID: string;
    const createdEmpPWD: string = "Test@user1-123";

    beforeEach(function () {
        loginObj.login('Admin', 'admin123');
    })

    it('Entitlement - Acceptance', () => {
        /*
        Given The system has an Employee with Login Details X
        And The employee has number of entitlement (by API) X
        When The employee login to the system
        And The employee requests a leave day in the future (by API)
        And The admin login to the system
        And The admin approves the leave request (by API)
        And The employee login to the system
        And Open the My Leave page
        Then The leave should exist in the records table with status Scheduled
        */
        // create user to assign to the created vacancy later
        vacancyhelper.createEmployeeViaAPI()
            .then((response) => {
                createdEmpNumber = response.body.data.empNumber;
                createdEmpName = response.body.data.firstName
            })
            .then(() => {
                // create entitlement
                cy.api({
                    method: "POST",
                    url: "/web/index.php/api/v2/leave/leave-entitlements",
                    body: {
                        empNumber: createdEmpNumber,
                        leaveTypeId: 6,
                        fromDate: "2023-01-01",
                        toDate: "2024-08-24",
                        entitlement: 6,
                    },
                });
            })
            .then(() => {
                cy.api(
                    {
                        method: 'POST',
                        url: '/web/index.php/api/v2/admin/users',
                        body:
                        {
                            "username": createdEmpName,
                            "password": createdEmpPWD,
                            "status": true,
                            "userRoleId": 2,
                            "empNumber": createdEmpNumber
                        }
                    }
                )
            }).then(() => {
                loginObj.logout_and_then_login_and_check_valid_login(createdEmpName, createdEmpPWD)
            })
            .then(() => {
                // request leave
                cy.api({
                    method: "POST",
                    url: "/web/index.php/api/v2/leave/leave-requests",
                    body: {
                        leaveTypeId: 6,
                        fromDate: "2023-11-02",
                        toDate: "2023-11-4",
                        comment: null,
                        duration: {
                            type: "full_day",
                        },
                    },
                });
            }).then((response) => {
                entitlementID = response.body.data.id
                loginObj.logout_and_then_login_and_check_valid_login('Admin', 'admin123');
            })
            .then(() => {
                cy.api({
                    method: "PUT",
                    url: `/web/index.php/api/v2/leave/employees/leave-requests/${entitlementID}`,
                    body: {
                        action: "APPROVE",
                    },
                })
                .then(() => {
                loginObj.logout_and_then_login_and_check_valid_login(createdEmpName, createdEmpPWD);
            
                cy.get(":nth-child(1) > .oxd-main-menu-item > .oxd-text").click();
                cy.get(":nth-child(7) > div").should("contain", "Scheduled");
            })
            });
    });
})