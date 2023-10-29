
import VacancyHelper from "../../support/helper/candidateHelper"
import LoginPage from "../../support/page-objects/LoginPage"
import VacancyPage from "../../support/page-objects/VacancyPage"

const loginObj: LoginPage = new LoginPage();
const vacancyObj: VacancyPage = new VacancyPage();
const vacancyhelper: VacancyHelper = new VacancyHelper();

describe('Vacancy Functionality', () => {

    var createdEmpNumber: Number;
    var createdVacancyId: Number;

    beforeEach(function () {
        loginObj.login('Admin', 'admin123');
        vacancyhelper.createEmployeeViaAPI()
            .then((response) => {
                createdEmpNumber = response.body.data.empNumber;
            })
            // create vacancy to be assigned to the new candidate
            .then(() => { vacancyhelper.create_vacancy(createdEmpNumber) })
            .then((response) => { createdVacancyId = response.body.data.id })
    })

    it('Upload file to Vacancy - Scenario 2', () => {
        /*
        Given The system has a vacancy record
        When The user opens the vacancy form on the edit mode for that vacancy
        And The user clicks on Add button in the Attachments area
        And The user uploads a file for that vacancy and saves the form
        Then The file should be uploaded and added to vacancy
        */
        // move to pageObject
        const file2Upload: string = 'cypress/fixtures/sample.pdf';
        vacancyObj.upload_sample_pdf(createdVacancyId, file2Upload);
    });
})
