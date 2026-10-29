import { createRefNumber } from "../../support/utils";

describe('Enforcement notice appeal - organisation - agent - inquiry', () => {
    it('creates and submits appeal', () => {
        const refNumber = createRefNumber();

        cy.restoreSession();

        cy.startAppeal('enforcement-notice', refNumber);
        cy.enforcementNoticePrepareAppeal({ appellantType: 'organisation', submittedBy: 'agent', procedure: 'inquiry' });
        cy.enforcementNoticeUploadDocuments({ procedure: 'inquiry' });
        cy.submitAppeal('enforcement-notice');
    });
});

