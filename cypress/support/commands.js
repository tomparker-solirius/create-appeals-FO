Cypress.Commands.add('restoreSession', (authPath = 'auth.json') => {
    cy.session(
        'auth', 
        () => {
          cy.readFile(authPath).then(({ cookies = [], origins = [] }) => {
             cookies.forEach((cookie) => {
                cy.setCookie(cookie.name, cookie.value, {
                    domain: cookie.domain,
                    path: cookie.path,
                    secure: cookie.secure,
                    httpOnly: cookie.httpOnly,
                    sameSite: { strict: 'strict', lax: 'lax', None: 'no_restriction' }[cookie.sameSite],
                    ...(cookie.expires > 0 && { expiry: cookie.expires }),
                });
            });

            cy.env(['APPEAL_URL']).then(({ APPEAL_URL: appealUrl }) => {
                expect(appealUrl, 'APPEAL_URL environment variable is set').to.be.a('string').and.not.be.empty;
                const appOrigin = new URL(appealUrl).origin;
                const appStorage = origins.find(({origin}) => origin === appOrigin)?.localStorage ?? [];
                if (appStorage.length > 0) {
                    cy.visit('/');
                    cy.window().then((win) => {
                        appStorage.forEach(({key, value}) => win.localStorage.setItem(key, value));
                    });
                }
            });
          });
        },
        { cacheAcrossSpecs: true },
    );
});

Cypress.Commands.add('onPage', (pathname, heading) => {
    cy.location('pathname').should('eq', pathname);
    cy.contains('h1', heading).should('be.visible');
});