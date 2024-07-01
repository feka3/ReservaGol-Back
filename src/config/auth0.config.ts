import {config as dotenvConfig} from 'dotenv'


dotenvConfig({ path: '.env.development' });

export const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH_SECRET,
    baseURL: process.env.AUTH_BASE_URL,
    clientID: process.env.AUTH_CLIENT_ID,
    issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL
};
