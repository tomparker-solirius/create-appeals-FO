import { createRefNumber } from "../../support/utils";

describe('Full planning appeal - agent - inquiry', () => {
    it('creates and submits appeal', () => {
        const refNumber = createRefNumber();

        cy.restoreSession();

        cy.startAppeal();
        cy.prepareAppeal({ submittedBy: 'agent', procedure: 'inquiry', refNumber });
        cy.fullPlanningUploadDocuments();
        cy.submitAppeal();
    });
});