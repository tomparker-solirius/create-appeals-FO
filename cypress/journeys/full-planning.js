import {
    answerAboutYouAndSite,
    answerAgriculturalHolding,
    answerApplicationAbout,
    answerDecideAppeal,
    answerDevelopmentDescription,
    answerGreenBelt,
    answerMajorMinorDevelopment,
    answerOtherAppeals,
    answerOwnAllLand,
    answerReferenceNumber,
    answerSiteArea,
    answerSiteVisit,
    answerWhyAppealing
} from '../support/questions';
import {
    answerAppealCosts,
    uploadApplicationForm,
    uploadDecisionLetter,
    uploadDescriptionEvidence,
    uploadEnvironmentalStatement,
    uploadPlanningObligation,
    uploadSeparateOwnershipCertificate
} from '../support/uploads';

const BASE_PATH = '/appeals/full-planning';

Cypress.Commands.add('fullPlanningPrepareAppeal', ({ submittedBy, procedure, refNumber }) => {
    cy.openTask(BASE_PATH, 'Answer');
    answerAboutYouAndSite(BASE_PATH, submittedBy);
    answerSiteArea(BASE_PATH);
    answerGreenBelt(BASE_PATH);
    answerOwnAllLand(BASE_PATH);
    answerAgriculturalHolding(BASE_PATH);
    answerSiteVisit(BASE_PATH);
    answerReferenceNumber(BASE_PATH, refNumber);
    answerMajorMinorDevelopment(BASE_PATH);
    answerApplicationAbout(BASE_PATH);
    answerDevelopmentDescription(BASE_PATH);
    answerWhyAppealing(BASE_PATH);
    answerDecideAppeal(BASE_PATH, procedure);
    answerOtherAppeals(BASE_PATH);
});

Cypress.Commands.add('fullPlanningUploadDocuments', () => {
    cy.openTask(BASE_PATH, 'Upload');
    uploadApplicationForm(BASE_PATH);
    uploadEnvironmentalStatement(BASE_PATH);
    uploadDescriptionEvidence(BASE_PATH);
    uploadDecisionLetter(BASE_PATH);
    uploadPlanningObligation(BASE_PATH);
    uploadSeparateOwnershipCertificate(BASE_PATH);
    answerAppealCosts(BASE_PATH);
});
