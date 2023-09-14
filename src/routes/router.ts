import express, { NextFunction, Request, Response } from 'express';

import { authenticatedMiddleware, verifyRoleMiddleware } from '../middleware';

import { wrapHandlerWithJSONResponse } from '../common/response';
import Transaction from '../models/transaction.module';
import productRouter from './product.routes';
import catalogRouter from './catalog.routes';
import uploadRouter from './upload.routes';
import Order from '../models/order.module';
import orderRouter from './order.routes';
import userRouter from './user.routes';

import auth from '../auth/auth';

import { ORDER_STATUS, PAYMENT_STATUS, ROLE } from '../util/constant';

import * as MailService from '../services/mail.service.js';
import { generateString, hashWithBcrypt } from '../util/funcHelper';
import User from '../models/user.module';

const apiRoute = express();

apiRoute.post('/login', wrapHandlerWithJSONResponse(auth.login));
apiRoute.post('/register', wrapHandlerWithJSONResponse(auth.register));

apiRoute.post(
    '/forgot-password',
    wrapHandlerWithJSONResponse((req: Request, res: Response, next: NextFunction) => {
        try {
            const newPassword = generateString();

            const content = 'Bạn vui lòng đăng nhập bằng mật khẩu mới là: ' + newPassword;

            const code = hashWithBcrypt(10, newPassword);

            User.update(
                {
                    password: code,
                },
                { where: { email: req.body.email } },
            );

            MailService.handleSendMail(req.body.email, content);
            return {
                message: 'Vui lòng kiếm tra hộp thư đến của mail: ' + req.body.email,
            };
        } catch (error) {
            console.log('Error forgot password: ', { error });
        }
    }),
);

apiRoute.use('/uploads', uploadRouter);

apiRoute.get('/color', (req, res, next) => {
    res.send('Danh sach mau');
});

apiRoute.get('/size', (req, res, next) => {
    res.send('Danh sach size');
});

apiRoute.use('/user', authenticatedMiddleware, userRouter);

apiRoute.use('/catalog', catalogRouter);

apiRoute.use('/product', productRouter);

apiRoute.use('/order', orderRouter);

apiRoute.post(
    '/pay',
    wrapHandlerWithJSONResponse((req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req;

            const data = {
                pay_id: body?.details?.id,
                order_id: body.order_id,
                name: body?.details?.payer?.name?.given_name + body?.details?.payer?.name?.surname || '',
                email: body?.details?.payer?.email_address,
                payment_source: body?.data?.paymentSource,
                create_time: body?.details?.create_time,
            };

            Transaction.create(data);

            if (body?.data?.paymentSource === 'paypal') {
                Order.update(
                    { payment_status: PAYMENT_STATUS.PAID, status: ORDER_STATUS.CONFIRM },
                    { where: { id: body.order_id } },
                );
            } else {
                Order.update({ status: ORDER_STATUS.CONFIRM }, { where: { id: body.order_id } });
            }

            return {
                message: 'Đơn hàng của bạn đã thanh toán thành công. Vui lòng đợi shipper liên hệ!',
                data,
            };
        } catch (error) {
            console.log('Error pay: ', { error });
        }
    }),
);

apiRoute.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404);
    res.json({
        status: 404,
        message: 'Not Found',
    });
});

apiRoute.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
        status: err.status,
        message: err.message,
    });
});

export default apiRoute;
