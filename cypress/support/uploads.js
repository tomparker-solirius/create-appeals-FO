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

export function uploadSeparateOwnershipCertificate(basePath) {
    cy.onPage(`${basePath}/upload-documents/separate-ownership-certificate`, 'Did you submit a separate ownership certificate');
    cy.findByLabelText('No').check();
    cy.clickContinue();
}

export function answerAppealCosts(basePath) {
    cy.onPage(`${basePath}/upload-documents/apply-appeal-costs`, 'Do you want to apply for an award of appeal costs?');
    cy.findByLabelText('No').check();
    cy.clickContinue();
}

export function answerSubmitPlanningObligation(basePath){
    cy.onPage(`${basePath}/upload-documents/submit-planning-obligation`, 'Do you plan to submit a planning obligation to support your appeal?');
    cy.findByLabelText('No').check();
    cy.clickContinue();
}

export function uploadAppealStatement(basePath) {
    cy.onPage(`${basePath}/upload-documents/upload-appeal-statement`, 'Upload your appeal statement');
    cy.get('input[type="file"]').selectFile('./test_data/test_doc_3.pdf', { force: true });
    cy.clickContinue();
}

export function uploadDraftStatementOfCommonGround(basePath) {
    cy.onPage(`${basePath}/upload-documents/upload-draft-statement-common-ground`, 'Upload your draft statement of common ground');
    cy.get('input[type="file"]').selectFile('./test_data/test_doc_3.pdf', { force: true });
    cy.clickContinue();
}


export function answerDesignAccessStatement(basePath){
    cy.onPage(`${basePath}/upload-documents/submit-design-access-statement`, 'Did you submit a design and access statement with your application?');
    cy.findByLabelText('No').check();
    cy.clickContinue();
}

export function uploadPlansDrawings(basePath) {
    cy.onPage(`${basePath}/upload-documents/upload-plans-drawings-documents`, 'Upload your plans, drawings and supporting documents');
    cy.get('input[type="file"]').selectFile('./test_data/test_doc_3.pdf', { force: true });
    cy.clickContinue();
}


export function answerNewPlansDrawings(basePath){
    cy.onPage(`${basePath}/upload-documents/new-plans-drawings`, 'Do you have any new plans or drawings that support your appeal?');
    cy.findByLabelText('No').check();
    cy.clickContinue();
}

export function answerOtherNewDocuments(basePath){
    cy.onPage(`${basePath}/upload-documents/other-new-documents`, 'Do you have any other new documents that support your appeal?');
    cy.findByLabelText('No').check();
    cy.clickContinue();
}



