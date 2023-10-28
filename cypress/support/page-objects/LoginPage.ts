import { BASE_URL } from "../constants";

class LoginPage {

    elements =
        {
            userName: () => cy.getByPlaceHolder('Username'),
            password: () => cy.getByPlaceHolder('Password'),
            loginBtn: () => cy.get('button'),
            loginFailedText: () => cy.get('.oxd-alert-content'),

        }

    lgoinLabelsRequiredWarningFiled =
        {
            userNameLabelRquired_bothEmpty: () => cy.get(':nth-child(2) > .oxd-input-group > .oxd-text'),
            passwordLabelRquired_bothEmpty: () => cy.get(':nth-child(3) > .oxd-input-group > .oxd-text'),

            requiredBelowUserName: () => cy.get('.oxd-input-field-bottom-space').contains('Required').prevAll().contains('Username'),
            requiredBelowPWD: () => cy.get('.oxd-input-field-bottom-space').contains('Required').prevAll().contains('Password')
        }

    forgottPasswordElements =
        {
            // reset password
            forgotPasswordInHomePageBtn: () => cy.get('.orangehrm-login-forgot-header'),
            resetPasswordBtn: () => cy.get('.oxd-button--secondary'),
            notifyResetPassword: () => cy.get('.orangehrm-card-container'),


        }

    login(userName: string, password: string) {
        cy.visit('/web/index.php/auth/login');


        if (userName != "") {
            this.elements.userName().type(userName);
        }

        if (password != "") {
            this.elements.password().type(password);
        }

        this.elements.loginBtn().click();
    }


    login_check_valid_login(userName: string, password: string) {
        this.login(userName, password);
        // assert valid login
        cy.url().should('eq', BASE_URL + '/web/index.php/dashboard/index');
    }

    login_check_invalid_login(userName: string, password: string) {
        this.login(userName, password);
        // assert invalid login
        this.elements.loginFailedText().should('contain', 'Invalid credentials')

    }

    login_check_empty_username(userName: string, password: string) {
        this.login(userName, password);
        this.lgoinLabelsRequiredWarningFiled.requiredBelowUserName();

    }
    login_check_empty_password(userName: string, password: string) {
        this.login(userName, password);
        this.lgoinLabelsRequiredWarningFiled.requiredBelowPWD();
    }

    login_check_empty_user_and_password(userName: string, password: string) {
        this.login(userName, password);
        this.lgoinLabelsRequiredWarningFiled.userNameLabelRquired_bothEmpty();
        this.lgoinLabelsRequiredWarningFiled.passwordLabelRquired_bothEmpty();

    }

    logout_and_login(userName: string, password: string) {
        this.logout_and_then_login_and_check_valid_login(userName, password);
    }

    logout_and_then_login_and_check_valid_login(userName: string, password: string) {
        cy.wait(2000);
        cy.get('.oxd-userdropdown-name').click().get('.oxd-dropdown-menu').contains('Logout').click();
        cy.wait(2000);
        this.login_check_valid_login(userName, password);
    }

    forgottPassword(userName: string) {
        this.forgottPasswordElements.forgotPasswordInHomePageBtn().click();
        cy.url().should('eq', BASE_URL + '/web/index.php/auth/requestPasswordResetCode');

        this.elements.userName().type(userName);
        this.forgottPasswordElements.resetPasswordBtn().click();

        cy.url().should('eq', BASE_URL + '/web/index.php/auth/sendPasswordReset');
        this.forgottPasswordElements.notifyResetPassword().contains('Reset Password link sent successfully');

    }
}

export default LoginPage;