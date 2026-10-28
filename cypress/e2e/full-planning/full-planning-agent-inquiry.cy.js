import { createRefNumber } from "../../support/utils";

describe('Full planning appeal - agent - inquiry', () => {
    it('creates and submits appeal', () => {
        const refNumber = createRefNumber();

        cy.restoreSession();

        cy.startAppeal('full-planning');
        cy.fullPlanningPrepareAppeal({ submittedBy: 'agent', procedure: 'inquiry', refNumber });
        cy.fullPlanningUploadDocuments();
        cy.submitAppeal('full-planning');
    });
});