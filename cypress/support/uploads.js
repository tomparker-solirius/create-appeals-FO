export function uploadApplicationForm(basePath) {
    cy.onPage(`${basePath}/upload-documents/upload-application-form`, 'Upload your application form');
    cy.get('input[type="file"]').selectFile('./test_data/test_doc_1.pdf', { force: true });
    cy.clickContinue();
}

export function uploadEnvironmentalStatement(basePath) {
    cy.onPage(`${basePath}/upload-documents/submit-environmental-statement`, 'Did you submit an environmental statement with the application?');
    cy.findByLabelText('No').check();
    cy.clickContinue();
}
export const answerEnvironmentalStatement = uploadEnvironmentalStatement;

export function uploadDescriptionEvidence(basePath) {
    // Evidence of agreed description change
    cy.onPage(`${basePath}/upload-documents/upload-description-evidence`, 'Upload evidence of your agreement to change the description of development');
    cy.get('input[type="file"]').selectFile('./test_data/test_doc_2.pdf', { force: true });
    cy.clickContinue();
}

export function uploadDecisionLetter(basePath) {
    cy.onPage(`${basePath}/upload-documents/upload-decision-letter`, 'Upload the decision letter');
    cy.get('input[type="file"]').selectFile('./test_data/test_doc_3.pdf', { force: true });
    cy.clickContinue();
}

export function uploadPlanningObligation(basePath) {
    cy.onPage(`${basePath}/upload-documents/planning-obligation-submitted`, 'Do you have a planning obligation to support your appeal?');
    cy.findByLabelText('No').check();
    cy.clickContinue();
}
export const answerPlanningObligation = uploadPlanningObligation;

export function uploadSeparateOwnershipCertificate(basePath) {
    cy.onPage(`${basePath}/upload-documents/separate-ownership-certificate`, 'Did you submit a separate ownership certificate');
    cy.findByLabelText('No').check();
    cy.clickContinue();
}
export const answerSeparateOwnershipCertificate = uploadSeparateOwnershipCertificate;

export function answerAppealCosts(basePath) {
    cy.onPage(`${basePath}/upload-documents/apply-appeal-costs`, 'Do you want to apply for an award of appeal costs?');
    cy.findByLabelText('No').check();
    cy.clickContinue();
}
