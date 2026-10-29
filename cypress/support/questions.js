export const descriptionText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
export const hearingReasonText = 'A hearing is needed so the inspector can discuss issues with all parties.';
export const inquiryReasonText = 'An inquiry is needed because the evidence requires testing through cross-examination of witnesses.';

export function answerAboutYouAndSite(basePath, submittedBy) {
    const prepare = `${basePath}/prepare-appeal`;

    if (submittedBy === 'appellant') {
        cy.onPage(`${prepare}/application-name`, 'Was the application made in your name?');
        cy.findByLabelText('Yes, the application was made in my name').check();
        cy.clickContinue();
    } else if (submittedBy === 'agent') {
        cy.onPage(`${prepare}/application-name`, 'Was the application made in your name?');
        cy.findByLabelText("No, I'm acting on behalf of the applicant").check();
        cy.clickContinue();

        // Applicant's name (agent only)
        cy.onPage(`${prepare}/applicant-name`, "What is the applicant's name?");
        cy.findAllByLabelText('First name').should('be.visible').clear().type('John');
        cy.findAllByLabelText('Last name').should('be.visible').clear().type('Doe');
        cy.clickContinue();
    }

    answerContactDetails(basePath, submittedBy);
    answerPhoneNumber(basePath);
    answerSiteAddress(basePath)
}

export function answerContactDetails(basePath, submittedBy){
    const prepare = `${basePath}/prepare-appeal`;
    // Contact details (agent's own details on the agent journey)
    cy.onPage(`${prepare}/contact-details`, 'Contact details');
    cy.findByLabelText('First name').should('be.visible').clear().type('John');
    cy.findByLabelText('Last name').should('be.visible').clear().type('Doe');
    if (submittedBy === 'agent') {
        cy.findByLabelText('Organisation name (optional)').should('be.visible').clear().type('Test Company Ltd');
    }
    cy.clickContinue();
}

export function answerPhoneNumber(basePath){
    const prepare = `${basePath}/prepare-appeal`;
    // Phone number
    cy.onPage(`${prepare}/phone-number`, 'What is your phone number?');
    cy.findByLabelText('UK telephone number').should('be.visible').clear().type('+447933454333');
    cy.clickContinue();
}

export function answerSiteAddress(basePath){
    const prepare = `${basePath}/prepare-appeal`;
    // Address
    cy.onPage(`${prepare}/appeal-site-address`, 'What is the address of the appeal site?');
    cy.findByLabelText('Address line 1').should('be.visible').clear().type('30 Shire Lane');
    cy.findByLabelText('Town or city').should('be.visible').clear().type('Hobbiton');
    cy.findByLabelText('County (optional)').should('be.visible').clear().type('The Shire');
    cy.findByLabelText('Postcode').should('be.visible').clear().type('CF10 1AA');
    cy.clickContinue();
}


export function answerSiteArea(basePath, area = '100') {
    cy.onPage(`${basePath}/prepare-appeal/site-area`, 'What is the area of the appeal site?');
    if (basePath.includes('full-planning') || basePath.includes('listed-building')) {
        cy.get('input[data-cy="answer-m²"]').check();
        cy.findAllByLabelText('Site area, in square metres').should('be.visible').clear().type(area);
    } else {
        cy.findByRole('textbox').should('be.visible').clear().type(area);
    }
    cy.clickContinue();
}

export function answerGreenBelt(basePath) {
    cy.onPage(`${basePath}/prepare-appeal/green-belt`, 'Is the appeal site in a green belt?');
    cy.get('input[data-cy="answer-no"]').check();
    cy.clickContinue();
}

export function answerOwnAllLand(basePath) {
    cy.onPage(`${basePath}/prepare-appeal/own-all-land`, 'Do you own all of the land involved in the appeal?');
    cy.get('input[data-cy="answer-yes"]').check();
    cy.clickContinue();
}

export function answerAgriculturalHolding(basePath) {
    cy.onPage(`${basePath}/prepare-appeal/agricultural-holding`, 'Is the appeal site part of an agricultural holding?');
    cy.get('input[data-cy="answer-no"]').check();
    cy.clickContinue();
}

export function answerSiteVisit(basePath) {
    cy.onPage(`${basePath}/prepare-appeal/inspector-need-access`, 'Will an inspector need to access');
    cy.get('input[data-cy="answer-no"]').check();
    cy.clickContinue();

    // Health and safety issues
    cy.onPage(`${basePath}/prepare-appeal/health-safety-issues`, 'Health and safety issues');
    cy.get('input[data-cy="answer-no"]').check();
    cy.clickContinue();
}

export function answerReferenceNumber(basePath, refNumber) {
    cy.onPage(`${basePath}/prepare-appeal/reference-number`, 'What is the application reference number?');
    cy.findByLabelText('What is the application reference number?').should('be.visible').clear().type(refNumber);
    cy.clickContinue();
}

export function answerApplicationDate(basePath){
    cy.onPage(`${basePath}/prepare-appeal/application-date`, "What date did you submit your application");
    cy.findByLabelText('Day').should('be.visible').clear().type('10');
    cy.findByLabelText('Month').should('be.visible').clear().type('08');
    cy.findByLabelText('Year').should('be.visible').clear().type('2026');
    cy.clickContinue();
}

export function answerMajorMinorDevelopment(basePath, type = 'minor') {
    cy.onPage(`${basePath}/prepare-appeal/major-minor-development`, 'Was your application for a major or minor development?');
    cy.get(`input[data-cy="answer-${type}"]`).check();
    cy.clickContinue();
}

export function answerApplicationAbout(basePath, option = 'Householder development') {
    cy.onPage(`${basePath}/prepare-appeal/application-about`, 'Was your application about any of the following?');
    cy.findAllByLabelText(option).check();
    cy.clickContinue();
}

export function answerDevelopmentDescription(basePath) {
    // Description of development
    cy.onPage(`${basePath}/prepare-appeal/enter-description-of-development`, 'Enter the description of development');
    cy.findByRole('textbox').should('be.visible').clear().type(descriptionText);
    cy.clickContinue();

    // LPA description change
    cy.onPage(`${basePath}/prepare-appeal/description-development-correct`, 'Did the local planning authority change the description of development?');
    cy.findByLabelText('Yes, I agreed a new description with the local planning authority').check();
    cy.clickContinue();
}

export function answerWhyAppealing(basePath) {
    // Reasons for appeal
    cy.onPage(`${basePath}/prepare-appeal/why-are-you-appealing`, 'Summarise why you are appealing');
    cy.findByRole('textbox').should('be.visible').clear().type(descriptionText);
    cy.clickContinue();

    // Significant changes
    cy.onPage(`${basePath}/prepare-appeal/any-significant-changes`, 'Have there been any significant changes that would affect the application?');
    cy.findByLabelText('There have been no significant changes').check();
    cy.clickContinue();
}

export function answerDecideAppeal(basePath, procedure) {
    cy.onPage(`${basePath}/prepare-appeal/decide-appeal`, 'How would you prefer us to decide your appeal?');
    if (procedure === 'written-representations') {
        cy.findByLabelText('Written representations').check();
        cy.clickContinue();
    } else if (procedure === 'hearing') {
        cy.findByLabelText('Hearing').check();
        cy.clickContinue();

        cy.onPage(`${basePath}/prepare-appeal/why-prefer-hearing`, 'Why would you prefer a hearing?');
        cy.findByLabelText('Why would you prefer a hearing?').should('be.visible').clear().type(hearingReasonText);
        cy.clickContinue();
    } else if (procedure === 'inquiry') {
        cy.findByLabelText('Inquiry').check();
        cy.clickContinue();

        cy.onPage(`${basePath}/prepare-appeal/why-prefer-inquiry`, 'Why would you prefer an inquiry?');
        cy.findByLabelText('Why would you prefer an inquiry?').should('be.visible').clear().type(inquiryReasonText);
        cy.clickContinue();

        cy.onPage(`${basePath}/prepare-appeal/how-many-days-inquiry`, 'How many days would you expect the inquiry to last?');
        cy.get('#appellantPreferInquiryDuration').should('be.visible').clear().type('3');
        cy.clickContinue();

        cy.onPage(`${basePath}/prepare-appeal/how-many-witnesses`, 'How many witnesses would you expect to give evidence at the inquiry?');
        cy.get('#appellantPreferInquiryWitnesses').should('be.visible').clear().type('2');
        cy.clickContinue();
    }
}

export function answerOtherAppeals(basePath) {
    // Linked appeals
    cy.onPage(`${basePath}/prepare-appeal/other-appeals`, 'Are there other appeals linked to your development?');
    cy.findByLabelText('No').check();
    cy.clickContinue();
}

export const enforcementLinkedAppealAppellants = [
    {firstName: 'Bilbo', lastName: 'Baggins'},
    {firstName: 'Frodo', lastName: 'Baggins'},
    {firstName: 'Samwise', lastName: 'Gamgee'}
];
export const enforcementLinkedAppealsOrgName = 'Shire Holdings Ltd';

export function answerWhoIsAppealing(basePath, appellantType, submittedBy){
    const prepare = `${basePath}/prepare-appeal`;
    const [appellant] = enforcementLinkedAppealAppellants;
    const appellantName = `${appellant.firstName} ${appellant.lastName}`;

    cy.onPage(`${prepare}/who-is-appealing`, 'Who is appealing against the enforcement notice?');

    if(appellantType === 'individual'){
        cy.findByLabelText('An individual').check();
        cy.clickContinue();

        cy.onPage(`${prepare}/individual-name`, 'What is the name of the individual appealing against the enforcement notice?');
        cy.findByLabelText('First name').should('be.visible').clear().type(appellant.firstName);
        cy.findByLabelText('Last name').should('be.visible').clear().type(appellant.lastName);
        cy.clickContinue();

        cy.onPage(`${prepare}/are-you-individual`, `Are you ${appellantName}?`);
        cy.get(`input[data-cy="answer-${submittedBy === 'appellant' ? 'yes' : 'no'}"]`).check();
        cy.clickContinue();
    }else if(appellantType === 'additional-appellants'){
        cy.findByLabelText('Additional appellants').check();
        cy.clickContinue();

        enforcementLinkedAppealAppellants.forEach(({firstName, lastName}, index) => {
            if(index > 0){
                cy.onPage(`${prepare}/add-another-individual`, 'Do you need to add another individual?');
                cy.get('input[data-cy="answer-yes"]').check();
                cy.clickContinue();
            }
            cy.onPage(`${prepare}/add-another-individual`, 'What is the name of the individual appealing against the enforcement notice?');
            cy.findByLabelText('First name').should('be.visible').clear().type(firstName);
            cy.findByLabelText('Last name').should('be.visible').clear().type(lastName);
            cy.clickContinue();
        })

        cy.onPage(`${prepare}/add-another-individual`, 'Do you need to add another individual?');
        cy.get('input[data-cy="answer-no"]').check();
        cy.clickContinue();

        cy.onPage(`${prepare}/select-name`, 'Select your name');
        if(submittedBy === 'appellant'){
            cy.findByLabelText(appellantName).check();
        } else {
            cy.findByLabelText('I am appealing on behalf of the additional appellants').check();
        }
        cy.clickContinue();
    } else if(appellantType === 'organisation') {
        cy.findByLabelText('An organisation').check();
        cy.clickContinue();

        cy.onPage(`${prepare}/organisation-name`, 'What is the name of the organisation?');
        cy.findAllByLabelText('What is the name of the organisation?').should('be.visible').clear().type(enforcementLinkedAppealsOrgName);
        cy.clickContinue();
    }

    if(submittedBy === 'agent') answerContactDetails(basePath, submittedBy);
    answerPhoneNumber(basePath);

    if(!(appellantType === 'individual' && submittedBy === 'appellant')){
        cy.onPage(`${prepare}/complete-appeal`, 'Complete the appeal on behalf of');
        cy.clickContinue();
    }
}

export function answerIsContactAddress(basePath){
    cy.onPage(`${basePath}/prepare-appeal/is-contact-address`, 'Is the appeal site address your contact address?');
    cy.get('input[data-cy="answer-yes"]').check();
    cy.clickContinue();
}

export function answerLandInterest(basePath, appellantType){
    const count = appellantType === 'additional-appellants' ? enforcementLinkedAppealAppellants.length : 1;

    let previousPathname = '';
    for(let i = 0; i < count; i++){
        cy.location('pathname').should((pathname) => {
            expect(pathname).to.match(new RegExp(`^${basePath}/prepare-appeal/land-interest`));
            if (previousPathname) {
                expect(pathname).to.not.equal(previousPathname);
            }
        }).then((pathname) => {
            previousPathname = pathname;
        });
        cy.contains('h1', 'interest in the land?').should('be.visible');
        cy.findAllByLabelText('Owner').check();
        cy.clickContinue();
    }
}

export function answerAllegedBreach(basePath){
    cy.onPage(`${basePath}/prepare-appeal/description-alleged-breach`, 'Enter the description of the alleged breach');
    cy.findByRole('textbox').should('be.visible').clear().type(descriptionText);
    cy.clickContinue();
}

export function answerGroundsOfAppeal(basePath){
    const prepare = `${basePath}/prepare-appeal`

    cy.onPage(`${prepare}/choose-grounds`, 'Choose your grounds of appeal');
    cy.findByLabelText('Ground (a)').check();
    cy.clickContinue();

    cy.onPage(`${prepare}/submit-planning-application`, 'Did anyone submit a retrospective planning application?');
    cy.get('input[data-cy="answer-no"]').check();
    cy.clickContinue();

    cy.onPage(`${prepare}/pay-ground-a`, 'Did you pay the ground (a) fee?');
    cy.get('input[data-cy="answer-yes"]').check();
    cy.clickContinue();

    cy.onPage(`${prepare}/upload-ground-a-receipt`, 'Upload your ground (a) fee receipt');
    cy.get('input[type="file"]').selectFile('./test_data/test_doc_3.pdf', { force: true });
    cy.clickContinue();

    cy.onPage(`${prepare}/facts-ground-a`, 'Facts for ground (a)');
    cy.findByRole('textbox').should('be.visible').clear().type(descriptionText);
    cy.clickContinue();

    cy.onPage(`${prepare}/facts-ground-a-supporting-documents`, 'Do you have any documents to support your ground (a) facts?');
    cy.findByLabelText('No').check();
    cy.clickContinue();
}
