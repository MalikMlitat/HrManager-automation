export const BASE_URL = Cypress.config('baseUrl');
export const rowsCandidateAPI = '/web/index.php/api/v2/recruitment/candidates**';
export const TIMESHEET_API = '/web/index.php/api/v2/time/timesheets/';

import { faker } from '@faker-js/faker';

export var createdEmpNumber;
export const BASE_URL = Cypress.config('baseUrl');

export const CREATE_EMPL_API =  '/web/index.php/api/v2/pim/employees';
export const CREATE_EMPL_BODY =    {
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    empPicture: null,
    employeeId: "555"
};

export const CREATE_EMPL_REQ =
{
    method: 'POST',
    url: CREATE_EMPL_API,
    body: CREATE_EMPL_BODY
};


export const CREATE_VACNCY_API = "/web/index.php/api/v2/recruitment/vacancies";

export const CREATE_CANDIDATE_API = "/web/index.php/api/v2/recruitment/candidates";
export const CREATE_CANDIDATE_BODY = 
{
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    dateOfApplication: "2023-10-14",
    vacancyId: 8,
    contactNumber: null,
    keywords: null,
    consentToKeepData: false
};

export const CREATE_CANDIDATE_REQ =
{
    method: 'POST',
    url: CREATE_CANDIDATE_API,
    body: CREATE_CANDIDATE_BODY
}


