import { Router } from 'express';

import { pagingMiddleware } from '../middleware';
import ProductController from '../controllers/product.controller';
import { wrapHandlerWithJSONResponse } from '../common/response';

import { authenticatedMiddleware, verifyRoleMiddleware } from '../middleware';
import { ROLE } from '../util/constant';

const productRouter = Router();

productRouter.get('/', pagingMiddleware, wrapHandlerWithJSONResponse(ProductController.getList));

productRouter.post(
    '/',
    authenticatedMiddleware,
    verifyRoleMiddleware([ROLE.ADMIN, ROLE.USER]),
    wrapHandlerWithJSONResponse(ProductController.create),
);

productRouter.get('/:id', wrapHandlerWithJSONResponse(ProductController.detail));

productRouter.put(
    '/:id',
    authenticatedMiddleware,
    verifyRoleMiddleware([ROLE.ADMIN, ROLE.USER]),
    wrapHandlerWithJSONResponse(ProductController.update),
);

productRouter.delete(
    '/:id',
    authenticatedMiddleware,
    verifyRoleMiddleware([ROLE.ADMIN, ROLE.USER]),
    wrapHandlerWithJSONResponse(ProductController.delete),
);

export default productRouter;
