import {
    answerAboutYouAndSite,
    answerApplicationAbout,
    answerApplicationDate,
    answerDecideAppeal,
    answerDevelopmentDescription,
    answerGreenBelt,
    answerMajorMinorDevelopment,
    answerOtherAppeals,
    answerOwnAllLand,
    answerReferenceNumber,
    answerSiteArea,
    answerSiteVisit,
} from '../support/questions';
import {
    answerAppealCosts,
    answerDesignAccessStatement,
    answerNewPlansDrawings,
    answerOtherNewDocuments,
    uploadSeparateOwnershipCertificate,
    answerSubmitPlanningObligation,
    uploadAppealStatement,
    uploadApplicationForm,
    uploadDecisionLetter,
    uploadDescriptionEvidence,
    uploadDraftStatementOfCommonGround,
    uploadPlansDrawings,
} from '../support/uploads';

const BASE_PATH = '/appeals/listed-building';

Cypress.Commands.add('listedBuildingConsentPrepareAppeal', ({ submittedBy, procedure, refNumber }) => {
    cy.openTask(BASE_PATH, 'Answer');
    answerAboutYouAndSite(BASE_PATH, submittedBy);
    answerSiteArea(BASE_PATH);
    answerGreenBelt(BASE_PATH);
    answerOwnAllLand(BASE_PATH);
    answerSiteVisit(BASE_PATH);
    answerReferenceNumber(BASE_PATH, refNumber);
    answerApplicationDate(BASE_PATH);
    answerMajorMinorDevelopment(BASE_PATH);
    answerApplicationAbout(BASE_PATH);
    answerDevelopmentDescription(BASE_PATH);
    answerDecideAppeal(BASE_PATH, procedure);
    answerOtherAppeals(BASE_PATH);
});

Cypress.Commands.add('listedBuildingConsentUploadDocuments', ({procedure}) => {
    cy.openTask(BASE_PATH, 'Upload');
    uploadApplicationForm(BASE_PATH);
    uploadDescriptionEvidence(BASE_PATH);
    uploadDecisionLetter(BASE_PATH);
    answerSubmitPlanningObligation(BASE_PATH)
    uploadSeparateOwnershipCertificate(BASE_PATH)
    uploadAppealStatement(BASE_PATH)
    if(procedure !== 'written-representations') uploadDraftStatementOfCommonGround(BASE_PATH)
    answerAppealCosts(BASE_PATH);
    answerDesignAccessStatement(BASE_PATH);
    uploadPlansDrawings(BASE_PATH);
    answerNewPlansDrawings(BASE_PATH);
    answerOtherNewDocuments(BASE_PATH);
});