import { createRefNumber } from "../../support/utils";

describe('Enforcement notice appeal - additional appellants - agent - inquiry', () => {
    it('creates and submits appeal', () => {
        const refNumber = createRefNumber();

        cy.restoreSession();

        cy.startAppeal('enforcement-notice', refNumber);
        cy.enforcementNoticePrepareAppeal({ appellantType: 'additional-appellants', submittedBy: 'agent', procedure: 'inquiry' });
        cy.enforcementNoticeUploadDocuments({ procedure: 'inquiry' });
        cy.submitAppeal('enforcement-notice');
    });
});

