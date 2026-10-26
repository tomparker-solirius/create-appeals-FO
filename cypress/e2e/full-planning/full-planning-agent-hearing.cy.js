import { createRefNumber } from "../../support/utils";

describe('Full planning appeal - agent - hearing', () => {
    it('creates and submits appeal', () => {
        const refNumber = createRefNumber();

        cy.restoreSession();

        cy.startAppeal();
        cy.prepareAppeal({ submittedBy: 'agent', procedure: 'hearing', refNumber });
        cy.fullPlanningUploadDocuments();
        cy.submitAppeal();
    });
});