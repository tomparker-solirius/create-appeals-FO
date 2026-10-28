import { createRefNumber } from "../../support/utils";

describe('Listed building consent appeal - appellant - hearing', () => {
    it('creates and submits appeal', () => {
        const refNumber = createRefNumber();

        cy.restoreSession();

        cy.startAppeal('listed-building-consent');
        cy.listedBuildingConsentPrepareAppeal({ submittedBy: 'appellant', procedure: 'hearing', refNumber });
        cy.listedBuildingConsentUploadDocuments({ procedure: 'hearing' });
        cy.submitAppeal('listed-building-consent');
    });
});

