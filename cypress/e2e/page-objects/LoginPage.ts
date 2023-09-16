import { BASE_ÙRL } from "../../support/constants";

class LoginPage {

    elements=
    {
        userName: () => cy.getByPlaceHolder('Username'),
        password: () => cy.getByPlaceHolder('Password'),
        loginBtn: () => cy.get('button')
    }

    forgottPasswordElements=
    {
        // reset password
        forgotPasswordInHomePageBtn: () => cy.get('.orangehrm-login-forgot-header'),
        resetPasswordBtn: () => cy.get('.oxd-button--secondary'),
        notifyResetPassword: () => cy.get('.orangehrm-card-container')

    }

    login(userName: string, password:string)
    {
        this.elements.userName().type(userName);
        this.elements.password().type(password);

        this.elements.loginBtn().click();
    }

    forgottPassword(userName: string)
    {   
        this.forgottPasswordElements.forgotPasswordInHomePageBtn().click();
        cy.url().should('eq', BASE_ÙRL + '/web/index.php/auth/requestPasswordResetCode');

        this.elements.userName().type(userName);
        this.forgottPasswordElements.resetPasswordBtn().click();

        cy.url().should('eq',  BASE_ÙRL + '/web/index.php/auth/sendPasswordReset');
        this.forgottPasswordElements.notifyResetPassword().contains('Reset Password link sent successfully');

    }
}

export default LoginPage;