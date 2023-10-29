
import EntitlementHelper from "../../support/helper/entitlementHelper";

import LoginPage from "../../support/page-objects/LoginPage"

import { CREATE_EMPL_BODY } from "../../support/constants";

const loginObj: LoginPage = new LoginPage();
const entitlementHelper: EntitlementHelper = new EntitlementHelper();


describe('Entitlement TCs', () => {
    var createdEmpNumber: Number;
    var createdEmpName: string;
    var entitlementID: string;
    const createdEmpPWD: string = "Test@user1-123";

    beforeEach(function () {
        loginObj.login('Admin', 'admin123');
    })

    it('Entitlement - User request a leave, admin approve it', () => {
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
        entitlementHelper.createEmployeeViaAPI()
            .then((response) => {
                createdEmpNumber = response.body.data.empNumber;
                createdEmpName = response.body.data.firstName
            })
            .then(() => {
                // create entitlement
                entitlementHelper.createEntitlementViaAPI(createdEmpNumber);
            })
            .then(() => {
                entitlementHelper.createEmplWithLoginDataViaAPI(createdEmpName, createdEmpPWD, createdEmpNumber);
            }).then(() => {
                loginObj.logout_and_then_login_and_check_valid_login(createdEmpName, createdEmpPWD)
            })
            .then(() => {
                // request leave
                entitlementHelper.createLeaveRequestViaAPI(/*leaveTypeId:*/ 6, /*fromDate:*/"2023-11-02", /*toDate:*/"2023-11-4");
            }).then((response) => {
                entitlementID = response.body.data.id
                loginObj.logout_and_then_login_and_check_valid_login('Admin', 'admin123');
            })
            .then(() => {
                entitlementHelper.approveEntitlementViaAPI(entitlementID);
            })
            .then(() => {
                loginObj.logout_and_then_login_and_check_valid_login(createdEmpName, createdEmpPWD);
                entitlementHelper.verifyEntitlementStatus("Scheduled");
            })
    });
})
