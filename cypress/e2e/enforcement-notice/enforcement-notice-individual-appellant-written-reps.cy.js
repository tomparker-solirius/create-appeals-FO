import { createRefNumber } from "../../support/utils";

describe('Enforcement notice appeal - individual - appellant - written representations', () => {
    it('creates and submits appeal', () => {
        const refNumber = createRefNumber();

        cy.restoreSession();

        cy.startAppeal('enforcement-notice', refNumber);
        cy.enforcementNoticePrepareAppeal({ appellantType: 'individual', submittedBy: 'appellant', procedure: 'written-representations' });
        cy.enforcementNoticeUploadDocuments({ procedure: 'written-representations' });
        cy.submitAppeal('enforcement-notice');
    });
});

