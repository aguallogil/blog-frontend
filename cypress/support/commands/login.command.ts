const CryptoJS = require('crypto-js');
declare namespace Cypress {
    interface Chainable {
        login(username: string, password: string): Chainable
        logout(): Chainable
        getDecryptedToken(): Chainable<string>
        getDecryptedUserData(): Chainable<any>
    }
}

Cypress.Commands.add('login', (username, password) => {
    cy.visit('/')
    // Configura la URL de tu API y la clave secreta
    const apiUrl = 'http://localhost:3000/api/';
    const secretKey = 'MIPASSWORDULTRASECRETA';

    // Realiza la petición de inicio de sesión
    cy.request({
        method: 'POST',
        url: `${apiUrl}auth/login`,
        body: {
            username: username,
            password: password
        }
    }).then((response) => {
        // Extrae el token y los metadatos del usuario de la respuesta
        const token = response.body.access_token;;
        const userMetadata = {
            ttl: response.body.ttl,
            created: response.body.created,
            userId: response.body.userId,
            booksUserId: response.body.booksUserId
        };
        cy.log(token)
        // Encripta el token y los metadatos del usuario
        const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
        const encryptedUserMetadata = CryptoJS.AES.encrypt(JSON.stringify(userMetadata), secretKey).toString();

        // Establece las cookies
        cy.setCookie('authToken', encryptedToken, { path: '/' });
        cy.setCookie('userMetadata', encryptedUserMetadata, { path: '/' });
    });
});
Cypress.Commands.add('logout', () => {
    cy.clearCookie('authToken');
    cy.clearCookie('userMetadata');

});
Cypress.Commands.add('getDecryptedToken', () => {
    const secretKey = 'TU_CLAVE_SECRETA'; // Asegúrate de que esta sea la clave correcta

    return cy.getCookie('authToken').then((cookie) => {
        if (!cookie || !cookie.value) {
            throw new Error('No se encontró la cookie authToken');
        }

        const decryptedBytes = CryptoJS.AES.decrypt(cookie.value, secretKey);
        const token = decryptedBytes.toString(CryptoJS.enc.Utf8);

        return token; // Retorna el token desencriptado
    });
});
Cypress.Commands.add('getDecryptedUserData', () => {
    const secretKey = 'TU_CLAVE_SECRETA'; // Asegúrate de que esta sea la clave correcta

    return cy.getCookie('userMetadata').then((cookie) => {
        if (!cookie || !cookie.value) {
            throw new Error('No se encontró la cookie userMetadata');
        }

        const decryptedBytes = CryptoJS.AES.decrypt(cookie.value, secretKey);
        const user = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

        return user; // Retorna el token desencriptado
    });
});
