const APPEAL_TYPES = {
    'full-planning': {
        aboutAppealLabel: 'Full planning',
        applicationDatePath: '/before-you-start/application-date',
        grantedOrRefused: '/before-you-start/granted-or-refused',
        decisionDatePath: '/before-you-start/decision-date',
        emailBasePath: '/full-appeal/submit-appeal',
        basePath: '/appeals/full-planning'
    },
    'householder': {
        aboutAppealLabel: 'Householder planning',
        applicationDatePath: '/before-you-start/application-date',
        grantedOrRefused: '/before-you-start/granted-or-refused-householder',
        decisionDatePath: '/before-you-start/decision-date-householder',
        emailBasePath: '/appeal-householder-decision',
        basePath: '/appeals/householder'
    },
    'listed-building-consent': {
        aboutAppealLabel: 'Listed building consent',
        grantedOrRefused: '/before-you-start/granted-or-refused',
        decisionDatePath: '/before-you-start/decision-date',
        emailBasePath: '/listed-building',
        basePath: '/appeals/listed-building'
    },
    'enforcement-notice': {
        aboutAppealLabel: 'Enforcement notice',
        isEnforcement: true,
        emailBasePath: '/enforcement',
        basePath: '/appeals/enforcement'
    }
}

function getAppealType(appealType){
    return APPEAL_TYPES[appealType]; 
}

Cypress.Commands.add('startAppeal', (appealType, refNumber) => {
    const config = getAppealType(appealType)

    cy.env(['APPEAL_URL', 'LPA_NAME']).then(({ APPEAL_URL, LPA_NAME }) => {
        expect(APPEAL_URL, 'APPEAL_URL environment variable is set').to.be.a('string').and.not.be.empty;
        expect(LPA_NAME, 'LPA_NAME environment variable is set').to.be.a('string').and.not.be.empty;
        
        // 1. Initial appeal selection
        cy.visit(APPEAL_URL);
        cy.onPage('/appeal/new-saved-appeal', 'Do you want to start a new appeal or return to a saved appeal?');
        cy.findByLabelText('Start a new appeal').check();
        cy.clickContinue();

        // 2. Select local planning authority
        cy.onPage('/before-you-start/local-planning-authority', 'Find your local planning authority');
        cy.get('#local-planning-department').should('be.visible').type(LPA_NAME);
        cy.get('#local-planning-department__option--0').should('be.visible').click();
        cy.clickContinue();
    });

    // 3. Appeal type selection
    cy.onPage('/before-you-start/about-appeal', 'What is your appeal about?');
    cy.findByLabelText(config.aboutAppealLabel).check();
    cy.clickContinue();

    if(config.isEnforcement){

        cy.onPage('/before-you-start/enforcement-issue-date', 'What is the issue date on your enforcement notice?');
        cy.findByLabelText('Day').should('be.visible').clear().type('10');
        cy.findByLabelText('Month').should('be.visible').clear().type('09');
        cy.findByLabelText('Year').should('be.visible').clear().type('2026');
        cy.clickContinue();

        cy.onPage('/before-you-start/enforcement-effective-date', 'What is the effective date on your enforcement notice?');
        cy.findByLabelText('Day').should('be.visible').clear().type('3');
        cy.findByLabelText('Month').should('be.visible').clear().type('12');
        cy.findByLabelText('Year').should('be.visible').clear().type('2027');
        cy.clickContinue();
    }
    else{
    // 4. Date application submitted
    if(config.applicationDatePath){
        cy.onPage(config.applicationDatePath, 'What date did you submit your application?');
        cy.findByLabelText('Day').should('be.visible').clear().type('10');
        cy.findByLabelText('Month').should('be.visible').clear().type('08');
        cy.findByLabelText('Year').should('be.visible').clear().type('2026');
        cy.clickContinue();
     }

    // 5. Application status (Granted with conditions or Refused)
    cy.onPage(config.grantedOrRefused, 'Was your application granted or refused?');
    cy.findByLabelText('Refused').check();
    cy.clickContinue();

    // 6. Decision letter date
    cy.onPage(config.decisionDatePath, "What’s the date on the decision letter from the local planning authority?");
    cy.findByLabelText('Day').should('be.visible').clear().type('3');
    cy.findByLabelText('Month').should('be.visible').clear().type('09');
    cy.findByLabelText('Year').should('be.visible').clear().type('2026');
    cy.clickContinue();
    }

    // 7. Eligibility check page
    cy.onPage('/before-you-start/can-use-service', 'You can appeal using this service');
    cy.findByRole('button', { name: 'Start appeal' }).click();

    if(config.isEnforcement){
        cy.onPage(`${config.emailBasePath}/enforcement-reference-number`, 'What is the reference number on the enforcement notice?');
        cy.findByLabelText('What is the reference number on the enforcement notice?').should('be.visible').clear().type(refNumber);
        cy.clickContinue();
    }

    // 8. Email address and verification
    cy.env(['APPEAL_EMAIL', 'EMAIL_VERIFICATION_CODE']).then(({ APPEAL_EMAIL, EMAIL_VERIFICATION_CODE }) => {
        expect(APPEAL_EMAIL, 'APPEAL_EMAIL environment variable is set').to.be.a('string').and.not.be.empty;
        expect(EMAIL_VERIFICATION_CODE, 'EMAIL_VERIFICATION_CODE environment variable is set').to.be.a('string').and.not.be.empty;

        cy.onPage(`${config.emailBasePath}/email-address`, 'What is your email address?');
        cy.findByLabelText('What is your email address?').should('be.visible').clear().type(APPEAL_EMAIL);
        cy.clickContinue();

        cy.onPage(`${config.emailBasePath}/enter-code`, 'Enter the code we sent to your email address');
        cy.findByLabelText('Enter the code we sent to your email address').should('be.visible').type(EMAIL_VERIFICATION_CODE);
        cy.clickContinue();
    });

    // Email confirmed
    cy.onPage(`${config.emailBasePath}/email-address-confirmed`, 'Your email address is confirmed');
    cy.clickContinue();

    //9. Before you start overview
    cy.onPage(`${config.basePath}/appeal-form/before-you-start`, 'Before you start');
    cy.clickContinue();
});

Cypress.Commands.add('submitAppeal', (appealType) => {
    const config = getAppealType(appealType)

    cy.onPage(`${config.basePath}/appeal-form/your-appeal`, 'Your appeal');
    cy.findAllByRole('link', { name: 'Continue'}).first().click();
    cy.get('button[data-cy="submit-appeal"]').click();
    cy.contains('h1', 'Appeal submitted').should('be.visible', { timeout: 10000 });
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
