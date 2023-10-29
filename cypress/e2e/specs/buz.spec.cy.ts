
import BuzPage from "../../support/page-objects/BuzPage";
import LoginPage from "../../support/page-objects/LoginPage"


const loginObj:LoginPage = new LoginPage();
const buzPage:BuzPage = new BuzPage();

describe('Buz Functionality', () => {

   
    beforeEach(function()
    {
        loginObj.login('Admin', 'admin123');
        cy.visit('web/index.php/buzz/viewBuzz');
    })

    it('Add post to Buzz Fewsfeed',() => {
        buzPage.addTextToInputField()
    });
})