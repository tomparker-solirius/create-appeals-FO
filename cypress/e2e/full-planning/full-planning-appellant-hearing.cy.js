import { createRefNumber } from "../../support/utils";

describe('Full planning appeal - appellant - hearing', () => {
    it('creates and submits appeal', () => {
        const refNumber = createRefNumber();

        cy.restoreSession();

        cy.startAppeal('full-planning');
        cy.fullPlanningPrepareAppeal({ submittedBy: 'appellant', procedure: 'hearing', refNumber });
        cy.fullPlanningUploadDocuments();
        cy.submitAppeal('full-planning');
    });
});