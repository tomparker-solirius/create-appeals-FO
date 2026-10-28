import {
    answerAboutYouAndSite,
    answerDevelopmentDescription,
    answerGreenBelt,
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
    uploadDescriptionEvidence
} from '../support/uploads';

const BASE_PATH = '/appeals/householder';

Cypress.Commands.add('householderPrepareAppeal', ({ submittedBy, refNumber }) => {
    cy.openTask(BASE_PATH, 'Answer');
    answerAboutYouAndSite(BASE_PATH, submittedBy);
    answerSiteArea(BASE_PATH);
    answerGreenBelt(BASE_PATH);
    answerOwnAllLand(BASE_PATH);
    answerSiteVisit(BASE_PATH);
    answerReferenceNumber(BASE_PATH, refNumber);
    answerDevelopmentDescription(BASE_PATH);
    answerWhyAppealing(BASE_PATH);
    answerOtherAppeals(BASE_PATH);
});

Cypress.Commands.add('houseHolderUploadDocuments', () => {
    cy.openTask(BASE_PATH, 'Upload');
    uploadApplicationForm(BASE_PATH);
    uploadDescriptionEvidence(BASE_PATH);
    uploadDecisionLetter(BASE_PATH);
    answerAppealCosts(BASE_PATH);
});
