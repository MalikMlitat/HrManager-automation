import { spec } from "node:test/reporters";
import { BASE_URL } from "../constants";

class VacancyPage {

    elements =
        {
            addBtn: () => cy.get('.oxd-button').contains('Add'),
            selectPDF: () => cy.get('input[type="file"]'),
            save2Btn: () => cy.get(':nth-child(3) > .oxd-form > .oxd-form-actions > .oxd-button--secondary'),

            

        }

    select_file_to_upload(File2Upload: string) {
        //'cypress/fixtures/sample.pdf'
        this.elements.selectPDF().selectFile(File2Upload, { force: true })
    }

    upload_sample_pdf(createdVacancyId: Number, File2Upload: string) {
        cy.visit("/web/index.php/recruitment/addJobVacancy/" + createdVacancyId)
        this.elements.addBtn().click();
        cy.wait(100);
        this.select_file_to_upload(File2Upload);
        this.elements.save2Btn().click()
        cy.get('div').contains('sample.pdf').click(); // todo: get file name from File2Upload
    }



}

export default VacancyPage;