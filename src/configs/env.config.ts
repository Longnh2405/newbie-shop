import dotenv from 'dotenv';

dotenv.config();

class ENVConfig {
    port: string | number;
    client_url: string;
    dbHost: string;
    dbUser: string;
    dbPassword: string;
    dbDatabase: string;
    accessTokenSecret: string;
    refreshTokenSecret: string;

    paypal_client_id: string;
    paypal_secret_key: string;

    constructor() {
        this.port = process.env.PORT || 5000;
        this.client_url = process.env.CLIENT_URL || 'http://localhost:3000';
        this.dbHost = process.env.DB_HOST || 'localhost';
        this.dbUser = process.env.DB_USER || 'root';
        this.dbPassword = process.env.DB_PASSWORD || 'long123';
        this.dbDatabase = process.env.DB_DATABASE || 'newbie-shop';
        this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'mysecret';
        this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'myrefreshsecret';

        this.paypal_client_id =
            process.env.PAYPAL_CLIENT_ID ||
            'ARFCwQsfxxDpC_-g7S7u6Xd6xxVRWezQwbkJHm0XA9iDNtNDnmUSP1W1MSuoMO_sl9sMxx-PipjSZcBO';
        this.paypal_secret_key =
            process.env.PAYPAL_SECRET_KEY ||
            'ELDC6UNt2IXVbNSaisfRy5T0FEi6jGgaPQ_tjOCXNZt5ovMVYgcHydfUe7QMvR5P4VGQM3-Nvzcl6a9Z';
    }
}

export default new ENVConfig();
