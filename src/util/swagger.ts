import { Express, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'REST API Documentation',
            version: '1.0.0',
        },
        servers: [
            // {
            //     url: '/',
            //     description: 'Local Dev, or from Heroku',
            // },
            // {
            //     url: '/api/',
            //     description: 'With docker-compose and nginx proxy',
            // },
        ],
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },

    apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app: Express) {
    //Swagger page
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    //Docs in JSON format
    app.get('docs.json', (_req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}

export default swaggerDocs;
