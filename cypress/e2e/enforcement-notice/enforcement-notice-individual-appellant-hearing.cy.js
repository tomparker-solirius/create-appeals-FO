import { createRefNumber } from "../../support/utils";

describe('Enforcement notice appeal - individual - appellant - hearing', () => {
    it('creates and submits appeal', () => {
        const refNumber = createRefNumber();

        cy.restoreSession();

        cy.startAppeal('enforcement-notice', refNumber);
        cy.enforcementNoticePrepareAppeal({ appellantType: 'individual', submittedBy: 'appellant', procedure: 'hearing' });
        cy.enforcementNoticeUploadDocuments({ procedure: 'hearing' });
        cy.submitAppeal('enforcement-notice');
    });
});

