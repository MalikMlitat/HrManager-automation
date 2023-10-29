
import { faker } from '@faker-js/faker';

class BuzPage {

    elements =
        {
            inputTextField: () => cy.get('.oxd-buzz-post-input'),
            postBtn: () => cy.get('.oxd-buzz-post-slot > .oxd-button'),

        }
    createTextFile(filePath: string, content: string) {
        //todo: move this to helper
        cy.writeFile(filePath, content)
    }

    addTextToInputField() {
        const randomParagraph: string = faker.lorem.paragraph();
        const text_file_name: string = 'my_dummy_file.txt';
        this.createTextFile('cypress/fixtures/' + text_file_name, randomParagraph);
        cy.wait(2000);
        cy.fixture(text_file_name).then((data) => {
            this.elements.inputTextField().click().type(data);
            this.elements.postBtn().click();
            cy.contains('.orangehrm-buzz-newsfeed-posts', data);
        })

    }

}

export default BuzPage;
