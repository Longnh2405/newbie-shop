import { Router } from 'express';

import { wrapHandlerWithJSONResponse } from '../common/response';
import { pagingMiddleware } from '../middleware';

import OrderController from '../controllers/order.controllers';

import { authenticatedMiddleware, verifyRoleMiddleware } from '../middleware';
import { ROLE } from '../util/constant';

const orderRouter = Router();

orderRouter.get(
    '/',
    pagingMiddleware,
    authenticatedMiddleware,
    verifyRoleMiddleware([ROLE.ADMIN, ROLE.USER]),
    wrapHandlerWithJSONResponse(OrderController.get),
);

orderRouter.post(
    '/',
    authenticatedMiddleware,
    verifyRoleMiddleware([ROLE.ADMIN, ROLE.USER]),
    wrapHandlerWithJSONResponse(OrderController.create),
);

orderRouter.put(
    '/:id',
    authenticatedMiddleware,
    verifyRoleMiddleware([ROLE.ADMIN, ROLE.USER]),
    wrapHandlerWithJSONResponse(OrderController.update),
);

export default orderRouter;
