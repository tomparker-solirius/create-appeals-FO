import {
    answerAllegedBreach,
    answerDecideAppeal,
    answerGroundsOfAppeal,
    answerIsContactAddress,
    answerLandInterest,
    answerOtherAppeals,
    answerSiteAddress,
    answerSiteVisit,
    answerWhoIsAppealing
} from '../support/questions';
import {
    answerAppealCosts,
    answerOtherNewDocuments,
    answerSubmitPlanningObligation,
    uploadEnforcementNotice,
    uploadEnforcementNoticePlan
} from '../support/uploads';

const BASE_PATH = '/appeals/enforcement';

Cypress.Commands.add('enforcementNoticePrepareAppeal', ({ appellantType, submittedBy, procedure }) => {
    cy.openTask(BASE_PATH, 'Answer');
    answerWhoIsAppealing(BASE_PATH, appellantType, submittedBy);
    answerSiteAddress(BASE_PATH);
    answerIsContactAddress(BASE_PATH);
    answerLandInterest(BASE_PATH, appellantType);
    answerSiteVisit(BASE_PATH);
    answerAllegedBreach(BASE_PATH);
    answerGroundsOfAppeal(BASE_PATH);
    answerDecideAppeal(BASE_PATH, procedure);
    answerOtherAppeals(BASE_PATH);
});

Cypress.Commands.add('enforcementNoticeUploadDocuments', ({procedure}) => {
    cy.openTask(BASE_PATH, 'Upload your enforcement notice');
    uploadEnforcementNotice(BASE_PATH);
    uploadEnforcementNoticePlan(BASE_PATH);
    answerSubmitPlanningObligation(BASE_PATH);
    answerAppealCosts(BASE_PATH);
    answerOtherNewDocuments(BASE_PATH);   
});