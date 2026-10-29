import { createRefNumber } from "../../support/utils";

describe('Enforcement notice appeal - additional appellants - appellant - written representations', () => {
    it('creates and submits appeal', () => {
        const refNumber = createRefNumber();

        cy.restoreSession();

        cy.startAppeal('enforcement-notice', refNumber);
        cy.enforcementNoticePrepareAppeal({ appellantType: 'additional-appellants', submittedBy: 'appellant', procedure: 'written-representations' });
        cy.enforcementNoticeUploadDocuments({ procedure: 'written-representations' });
        cy.submitAppeal('enforcement-notice');
    });
});

