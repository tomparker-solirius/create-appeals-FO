import { createRefNumber } from "../../support/utils";

describe('Enforcement notice appeal - organisation - agent - written representations', () => {
    it('creates and submits appeal', () => {
        const refNumber = createRefNumber();

        cy.restoreSession();

        cy.startAppeal('enforcement-notice', refNumber);
        cy.enforcementNoticePrepareAppeal({ appellantType: 'organisation', submittedBy: 'agent', procedure: 'written-representations' });
        cy.enforcementNoticeUploadDocuments({ procedure: 'written-representations' });
        cy.submitAppeal('enforcement-notice');
    });
});

