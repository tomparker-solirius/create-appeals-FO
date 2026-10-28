import { createRefNumber } from "../../support/utils";

describe('Listed building consent appeal - agent - written representations', () => {
    it('creates and submits appeal', () => {
        const refNumber = createRefNumber();

        cy.restoreSession();

        cy.startAppeal('listed-building-consent');
        cy.listedBuildingConsentPrepareAppeal({ submittedBy: 'agent', procedure: 'written-representations', refNumber });
        cy.listedBuildingConsentUploadDocuments({ procedure: 'written-representations' });
        cy.submitAppeal('listed-building-consent');
    });
});

