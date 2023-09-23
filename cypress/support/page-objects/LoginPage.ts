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
            userNameLabelRquired_OnlyUserNameEmpty: () => cy.get('.oxd-input-group > .oxd-text'),
            passWordLabelRquired_OnlyPasswordEmpty: () => cy.get('.oxd-input-group > .oxd-text'), // TODO(malik): fix this, those are equal

            userNameLabelRquired_bothEmpty: () => cy.get(':nth-child(2) > .oxd-input-group > .oxd-text'),
            passwordLabelRquired_bothEmpty: () => cy.get(':nth-child(3) > .oxd-input-group > .oxd-text'),

            classParentFields: () => cy.get('.oxd-input-field-bottom-space'),
        }

    forgottPasswordElements =
        {
            // reset password
            forgotPasswordInHomePageBtn: () => cy.get('.orangehrm-login-forgot-header'),
            resetPasswordBtn: () => cy.get('.oxd-button--secondary'),
            notifyResetPassword: () => cy.get('.orangehrm-card-container'),


        }

    login(userName: string, password: string) {

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
        // assert invalid login
        //this.elements.loginFailedText().should('contain', 'Invalid credentials')
        this.lgoinLabelsRequiredWarningFiled.userNameLabelRquired_OnlyUserNameEmpty().should('contain', 'Required')
        const fields = this.lgoinLabelsRequiredWarningFiled.classParentFields();
        fields.each(($element) => {
            // cy.wrap($element).contains('Username') || cy.wrap($element).contains('Password');

        })

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