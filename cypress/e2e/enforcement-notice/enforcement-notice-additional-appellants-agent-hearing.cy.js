import { createRefNumber } from "../../support/utils";

describe('Enforcement notice appeal - additional appellants - agent - hearing', () => {
    it('creates and submits appeal', () => {
        const refNumber = createRefNumber();

        cy.restoreSession();

        cy.startAppeal('enforcement-notice', refNumber);
        cy.enforcementNoticePrepareAppeal({ appellantType: 'additional-appellants', submittedBy: 'agent', procedure: 'hearing' });
        cy.enforcementNoticeUploadDocuments({ procedure: 'hearing' });
        cy.submitAppeal('enforcement-notice');
    });
});

