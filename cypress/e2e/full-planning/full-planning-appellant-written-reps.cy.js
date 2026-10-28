import { createRefNumber } from "../../support/utils";

describe('Full planning appeal - appellant - written representations', () => {
    it('creates and submits appeal', () => {
        const refNumber = createRefNumber();

        cy.restoreSession();

        cy.startAppeal('full-planning');
        cy.fullPlanningPrepareAppeal({ submittedBy: 'appellant', procedure: 'written-representations', refNumber });
        cy.fullPlanningUploadDocuments();
        cy.submitAppeal('full-planning');
    });
});