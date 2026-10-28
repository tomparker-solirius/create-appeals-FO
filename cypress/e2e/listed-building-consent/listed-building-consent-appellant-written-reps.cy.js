import { createRefNumber } from "../../support/utils";

describe('Listed building consent appeal - appellant - written representations', () => {
    it('creates and submits appeal', () => {
        const refNumber = createRefNumber();

        cy.restoreSession();

        cy.startAppeal('listed-building-consent');
        cy.listedBuildingConsentPrepareAppeal({ submittedBy: 'appellant', procedure: 'written-representations', refNumber });
        cy.listedBuildingConsentUploadDocuments({ procedure: 'written-representations' });
        cy.submitAppeal('listed-building-consent');
    });
});

