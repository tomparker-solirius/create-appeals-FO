import { createRefNumber } from "../../support/utils";

describe('Householder appeal - appellant - written representations', () => {
    it('creates and submits appeal', () => {
        const refNumber = createRefNumber();

        cy.restoreSession();

        cy.startAppeal('householder');
        cy.householderPrepareAppeal({ submittedBy: 'appellant', refNumber });
        cy.houseHolderUploadDocuments();
        cy.submitAppeal('householder');
    });
});
