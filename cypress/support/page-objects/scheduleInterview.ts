class SchedulInterview {
    elements = {
        interviewTitle: () => cy.get(':nth-child(2) > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input'),
        interviewDate: () => cy.get('.oxd-date-input > .oxd-input'),
        interviewer: () => cy.get('.oxd-autocomplete-text-input > input'),
        saveShortListBtn: () => cy.get('.oxd-button--secondary').contains('Save'),
        mark_interviewpassedButton: () => cy.get('.oxd-button--success').contains(' Mark Interview Passed ')
        }


    schedulInterview(inputcreatedEmpName: String) {
        this.elements.interviewTitle().type('Just a title');
        this.elements.interviewDate().click().clear().type('2024-06-23');

        this.elements.interviewer().clear().type(inputcreatedEmpName)
        .wait(5000)
        .type('{downarrow}')
        .type('{enter}');

        this.elements.saveShortListBtn().click();
        this.elements.mark_interviewpassedButton();

    }

}
export default SchedulInterview;