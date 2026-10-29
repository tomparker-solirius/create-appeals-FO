import { createRefNumber } from "../../support/utils";

describe('Enforcement notice appeal - organisation - agent - hearing', () => {
    it('creates and submits appeal', () => {
        const refNumber = createRefNumber();

        cy.restoreSession();

        cy.startAppeal('enforcement-notice', refNumber);
        cy.enforcementNoticePrepareAppeal({ appellantType: 'organisation', submittedBy: 'agent', procedure: 'hearing' });
        cy.enforcementNoticeUploadDocuments({ procedure: 'hearing' });
        cy.submitAppeal('enforcement-notice');
    });
});

