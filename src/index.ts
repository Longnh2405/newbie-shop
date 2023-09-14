import express, { Request, Response, NextFunction } from 'express';
// import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';

import { connectDB } from './configs/db.config';
import envConfig from './configs/env.config';
import swaggerDocs from './util/swagger';

dotenv.config();

const port = envConfig.port || 3003;
const client_url = envConfig.client_url || 'http://localhost:3000';
// const isProduction = process.env.NODE_ENV === 'production';

// const accessLogStream = rfs('access.log', {
//     interval: '1d',
//     path: join(__dirname, 'log'),
// });

const app = express();

app.use(helmet());

// GET http://192.168.2.4:5000/api/uploads/tu_choi.png net::ERR_BLOCKED_BY_RESPONSE.NotSameOrigin 200 (OK)
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// app.use(
//     isProduction
//         ? morgan('combined', { stream: accessLogStream })
//         : morgan('dev'),
// );

app.use(
    cors({
        // origin: client_url,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

app.listen(port, () => {
    console.log(`Server is running on the port ${port}`);

    connectDB();

    swaggerDocs(app);

    app.use('/api', require('./routes/router').default);

    app.get('/', (_req: any, res: any) => {
        res.json('Hello Đào Văn Dương!');
    });

    app.get('*', (_req: any, res: any) => {
        res.json('Hello Đào Văn Dương!');
    });
});
