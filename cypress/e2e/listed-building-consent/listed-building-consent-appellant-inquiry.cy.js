import { createRefNumber } from "../../support/utils";

describe('Listed building consent appeal - appellant - inquiry', () => {
    it('creates and submits appeal', () => {
        const refNumber = createRefNumber();

        cy.restoreSession();

        cy.startAppeal('listed-building-consent');
        cy.listedBuildingConsentPrepareAppeal({ submittedBy: 'appellant', procedure: 'inquiry', refNumber });
        cy.listedBuildingConsentUploadDocuments({ procedure: 'inquiry' });
        cy.submitAppeal('listed-building-consent');
    });
});

