const descriptionText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const hearingReasonText = 'A hearing is needed so the inspector can discuss issues with all parties.';
const inquiryReasonText = 'An inquiry is needed because the evidence requires testing through cross-examination of witnesses.';

Cypress.Commands.add('startAppeal', () => {
    cy.env(['APPEAL_URL', 'LPA_NAME']).then(({ APPEAL_URL, LPA_NAME }) => {
        expect(APPEAL_URL, 'APPEAL_URL environment variable is set').to.be.a('string').and.not.be.empty;
        expect(LPA_NAME, 'LPA_NAME environment variable is set').to.be.a('string').and.not.be.empty;
        
        // 1. Initial appeal selection
        cy.visit(APPEAL_URL);
        cy.onPage('/appeal/new-saved-appeal', 'Do you want to start a new appeal or return to a saved appeal?');
        cy.findByLabelText('Start a new appeal').check();
        clickContinue();

        // 2. Select local planning authority
        cy.onPage('/before-you-start/local-planning-authority', 'Find your local planning authority');
        cy.get('#local-planning-department').should('be.visible').type(LPA_NAME);
        cy.get('#local-planning-department__option--0').should('be.visible').click();
        clickContinue();
    });

    // 3. Appeal type selection
    cy.onPage('/before-you-start/about-appeal', 'What is your appeal about?');
    cy.findByLabelText('Full planning').check();
    clickContinue();

    // 4. Date application submitted
    cy.onPage('/before-you-start/application-date', 'What date did you submit your application?');
    cy.findByLabelText('Day').should('be.visible').clear().type('10');
    cy.findByLabelText('Month').should('be.visible').clear().type('08');
    cy.findByLabelText('Year').should('be.visible').clear().type('2026');
    clickContinue();

    // 5. Application status (Granted with conditions or Refused)
    cy.onPage('/before-you-start/granted-or-refused', 'Was your application granted or refused?');
    cy.findByLabelText('Refused').check();
    clickContinue();

    // 6. Decision letter date
    cy.onPage('/before-you-start/decision-date', "What’s the date on the decision letter from the local planning authority?​");
    cy.findByLabelText('Day').should('be.visible').clear().type('3');
    cy.findByLabelText('Month').should('be.visible').clear().type('09');
    cy.findByLabelText('Year').should('be.visible').clear().type('2026');
    clickContinue();

    // 7. Eligibility check page
    cy.onPage('/before-you-start/can-use-service', 'You can appeal using this service');
    cy.findByRole('button', { name: 'Start appeal' }).click();

    // 8. Email address and verification
    cy.env(['APPEAL_EMAIL', 'EMAIL_VERIFICATION_CODE']).then(({ APPEAL_EMAIL, EMAIL_VERIFICATION_CODE }) => {
        expect(APPEAL_EMAIL, 'APPEAL_EMAIL environment variable is set').to.be.a('string').and.not.be.empty;
        expect(EMAIL_VERIFICATION_CODE, 'EMAIL_VERIFICATION_CODE environment variable is set').to.be.a('string').and.not.be.empty;

        cy.onPage('/full-appeal/submit-appeal/email-address', 'What is your email address?');
        cy.findByLabelText('What is your email address?').should('be.visible').clear().type(APPEAL_EMAIL);
        clickContinue();

        cy.onPage('/full-appeal/submit-appeal/enter-code', 'Enter the code we sent to your email address');
        cy.findByLabelText('Enter the code we sent to your email address').should('be.visible').type(EMAIL_VERIFICATION_CODE);
        clickContinue();
    });

    // Email confirmed
    cy.onPage('/full-appeal/submit-appeal/email-address-confirmed', 'Your email address is confirmed');
    clickContinue();

    //9. Before you start overview
    cy.onPage('/appeals/full-planning/appeal-form/before-you-start', 'Before you start');
    clickContinue();
});

// SECTION 1 of the task list.
// submittedBy: 'appellant' | 'agent'
// procedureType: 'written-representations' | 'hearing' | 'inquiry'`
Cypress.Commands.add('prepareAppeal', ({ submittedBy, procedure, refNumber }) => {
    cy.onPage('/appeals/full-planning/appeal-form/your-appeal', 'Your appeal');
    cy.contains('a', 'Answer').click();
    
    // Was application made in your name
    if (submittedBy === 'appellant') {
        cy.onPage('/appeals/full-planning/prepare-appeal/application-name', 'Was the application made in your name?');
        cy.findByLabelText('Yes, the application was made in my name').check();
        clickContinue();
    }
    else if (submittedBy === 'agent') {
        cy.onPage('/appeals/full-planning/prepare-appeal/application-name', 'Was the application made in your name?');
        cy.findByLabelText("No, I'm acting on behalf of the applicant").check();
        clickContinue();

        //applicant's name (agent only)
        cy.onPage('/appeals/full-planning/prepare-appeal/applicant-name', "What is the applicant's name?");
        cy.findAllByLabelText('First name').should('be.visible').clear().type('John');
        cy.findAllByLabelText('Last name').should('be.visible').clear().type('Doe');
        clickContinue();
    }

    // Contact details (agent's own details on the agent journey)
    cy.onPage('/appeals/full-planning/prepare-appeal/contact-details', 'Contact details');
    cy.findByLabelText('First name').should('be.visible').clear().type('John');
    cy.findByLabelText('Last name').should('be.visible').clear().type('Doe');
    if (submittedBy === 'agent') {
        cy.findByLabelText('Organisation name (optional)').should('be.visible').clear().type('Test Company Ltd');
    }
    clickContinue();

    // Phone number
    cy.onPage('/appeals/full-planning/prepare-appeal/phone-number', 'What is your phone number?');
    cy.findByLabelText('UK telephone number').should('be.visible').clear().type('+447933454333');
    clickContinue();

    // Address
    cy.onPage('/appeals/full-planning/prepare-appeal/appeal-site-address', 'What is the address of the appeal site?');
    cy.findByLabelText('Address line 1').should('be.visible').clear().type('30 Shire Lane');
    cy.findByLabelText('Town or city').should('be.visible').clear().type('Hobbiton');
    cy.findByLabelText('County (optional)').should('be.visible').clear().type('The Shire');
    cy.findByLabelText('Postcode').should('be.visible').clear().type('CF10 1AA');
    clickContinue();

    // Site area
    cy.onPage('/appeals/full-planning/prepare-appeal/site-area', 'What is the area of the appeal site?');
    cy.get('input[data-cy="answer-m²"]').check();
    cy.findAllByLabelText('Site area, in square metres').should('be.visible').clear().type('100');
    clickContinue();

    // Green belt
    cy.onPage('/appeals/full-planning/prepare-appeal/green-belt', 'Is the appeal site in a green belt?');
    cy.get('input[data-cy="answer-no"]').check();
    clickContinue();

    // Land ownership
    cy.onPage('/appeals/full-planning/prepare-appeal/own-all-land', 'Do you own all of the land involved in the appeal?');
    cy.get('input[data-cy="answer-yes"]').check();
    clickContinue();

    // Agricultural holding
    cy.onPage('/appeals/full-planning/prepare-appeal/agricultural-holding', 'Is the appeal site part of an agricultural holding?');
    cy.get('input[data-cy="answer-no"]').check();
    clickContinue();

    // Site inspection access
    cy.onPage('/appeals/full-planning/prepare-appeal/inspector-need-access', 'Will an inspector need to access your land or property?');
    cy.get('input[data-cy="answer-no"]').check();
    clickContinue();

    // Health and safety issues
    cy.onPage('/appeals/full-planning/prepare-appeal/health-safety-issues', 'Health and safety issues');
    cy.get('input[data-cy="answer-no"]').check();
    clickContinue();

    // Application reference number
    cy.onPage('/appeals/full-planning/prepare-appeal/reference-number', 'What is the application reference number?');
    cy.findByLabelText('What is the application reference number?').should('be.visible').clear().type(refNumber);
    clickContinue();

    // Major or minor development
    cy.onPage('/appeals/full-planning/prepare-appeal/major-minor-development', 'Was your application for a major or minor development?');
    cy.get('input[data-cy="answer-minor"]').check();
    clickContinue();

    // Development type
    cy.onPage('/appeals/full-planning/prepare-appeal/application-about', 'Was your application about any of the following?');
    cy.findAllByLabelText('Householder development').check();
    clickContinue();

    // Description of development
    cy.onPage('/appeals/full-planning/prepare-appeal/enter-description-of-development', 'Enter the description of development');
    cy.findByRole('textbox').should('be.visible').clear().type(descriptionText);
    clickContinue();

    // LPA description change
    cy.onPage('/appeals/full-planning/prepare-appeal/description-development-correct', 'Did the local planning authority change the description of development?');
    cy.findByLabelText('Yes, I agreed a new description with the local planning authority').check();
    clickContinue();

    // Reasons for appeal
    cy.onPage('/appeals/full-planning/prepare-appeal/why-are-you-appealing', 'Summarise why you are appealing');
    cy.findByRole('textbox').should('be.visible').clear().type(descriptionText);
    clickContinue();

    // Significant changes
    cy.onPage('/appeals/full-planning/prepare-appeal/any-significant-changes', 'Have there been any significant changes that would affect the application?');
    cy.findByLabelText('There have been no significant changes').check();
    clickContinue();

    // Decision procedure preference, plus follow up questions for hearing and inquiry
    cy.onPage('/appeals/full-planning/prepare-appeal/decide-appeal', 'How would you prefer us to decide your appeal?');
    if (procedure === 'written-representations') {
        cy.findByLabelText('Written representations').check();
        clickContinue();
    }
    else if (procedure === 'hearing') {
        cy.findByLabelText('Hearing').check();
        clickContinue(); 

        cy.onPage('/appeals/full-planning/prepare-appeal/why-prefer-hearing', 'Why would you prefer a hearing?');
        cy.findByLabelText('Why would you prefer a hearing?').should('be.visible').clear().type(hearingReasonText);
        clickContinue();
    }
    else if (procedure === 'inquiry') {
        cy.findByLabelText('Inquiry').check();
        clickContinue();

        cy.onPage('/appeals/full-planning/prepare-appeal/why-prefer-inquiry', 'Why would you prefer an inquiry?');
        cy.findByLabelText('Why would you prefer an inquiry?').should('be.visible').clear().type(inquiryReasonText);
        clickContinue();

        // Expected inquiry length 
        cy.onPage('/appeals/full-planning/prepare-appeal/how-many-days-inquiry', 'How many days would you expect the inquiry to last?');
        cy.get('#appellantPreferInquiryDuration').should('be.visible').clear().type('3');
        clickContinue();

        // Expected number of witnesses
        cy.onPage('/appeals/full-planning/prepare-appeal/how-many-witnesses', 'How many witnesses would you expect to give evidence at the inquiry?');
        cy.get('#appellantPreferInquiryWitnesses').should('be.visible').clear().type('2');
        clickContinue();
    }

    // Linked appeals
    cy.onPage('/appeals/full-planning/prepare-appeal/other-appeals', 'Are there other appeals linked to your development?')
    cy.findByLabelText('No').check();
    clickContinue();
});

// Section 2 of the task list. Document upload
Cypress.Commands.add('fullPlanningUploadDocuments', () => {
    cy.onPage('/appeals/full-planning/appeal-form/your-appeal', 'Your appeal');
    cy.contains('a', 'Upload').click();

    // Upload application form
    cy.onPage('/appeals/full-planning/upload-documents/upload-application-form', 'Upload your application form');
    cy.get('input[type="file"]').selectFile('./test_data/test_doc_1.pdf', { force: true });
    clickContinue()

    // Environmental statement
    cy.onPage('/appeals/full-planning/upload-documents/submit-environmental-statement', 'Did you submit an environmental statement with the application?')
    cy.findByLabelText('No').check();
    clickContinue();

    // Evidence of agreed description change
    cy.onPage('/appeals/full-planning/upload-documents/upload-description-evidence', 'Upload evidence of your agreement to change the description of development');
    cy.get('input[type="file"]').selectFile('./test_data/test_doc_2.pdf', { force: true });
    clickContinue()

    // Decision letter
    cy.onPage('/appeals/full-planning/upload-documents/upload-decision-letter', 'Upload the decision letter');
    cy.get('input[type="file"]').selectFile('./test_data/test_doc_3.pdf', { force: true });
    clickContinue()

    // Planning obligation
    cy.onPage('/appeals/full-planning/upload-documents/planning-obligation-submitted', 'Do you have a planning obligation to support your appeal?')
    cy.findByLabelText('No').check();
    clickContinue();

    // Separate ownership certificate
    cy.onPage('/appeals/full-planning/upload-documents/separate-ownership-certificate', 'Did you submit a separate ownership certificate')
    cy.findByLabelText('No').check();
    clickContinue();

    // Separate ownership certificate
    cy.onPage('/appeals/full-planning/upload-documents/apply-appeal-costs', 'Do you want to apply for an award of appeal costs?')
    cy.findByLabelText('No').check();
    clickContinue();
})

// Section 3 of the task list. Submit appeal
Cypress.Commands.add('submitAppeal', () => {
    cy.onPage('/appeals/full-planning/appeal-form/your-appeal', 'Your appeal');
    cy.findAllByRole('link', { name: 'Continue'}).first().click();
    cy.get('button[data-cy="submit-appeal"]').click();
    cy.contains('h1', 'Appeal submitted').should('be.visible');
    cy.contains('a', 'View your appeals').click();
    cy.contains('h1', 'Your appeals').should('be.visible');
    cy.get('#tab_waiting-for-review').click();
    cy.contains('caption', 'Waiting for review').should('be.visible');
    cy.reload();
    cy.wait(1000);
    cy.reload();
    cy.wait(1000);
    cy.contains('caption', 'Waiting for review').should("be.visible");
    cy.get('a[href*="60"]').last().invoke('text').then((appealNumber) => {
        cy.task('log', `Appeal number: ${appealNumber.trim()}`);
    });
})

function clickContinue() {
    cy.findByRole('button', { name: 'Continue' }).should('be.visible').click();
}