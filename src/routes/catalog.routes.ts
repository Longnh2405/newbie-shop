import { Router } from 'express';

import CatalogController from '../controllers/catalog.controllers';
import { wrapHandlerWithJSONResponse } from '../common/response';
import { pagingMiddleware, uploadMiddleware } from '../middleware';

import { authenticatedMiddleware, verifyRoleMiddleware } from '../middleware';
import { ROLE } from '../util/constant';

const catalogRouter = Router();

catalogRouter.get('/', pagingMiddleware, wrapHandlerWithJSONResponse(CatalogController.getList));

catalogRouter.post(
    '/',
    uploadMiddleware.single('file'),
    authenticatedMiddleware,
    verifyRoleMiddleware([ROLE.ADMIN, ROLE.USER]),
    wrapHandlerWithJSONResponse(CatalogController.create),
);

catalogRouter.put(
    '/:id',
    authenticatedMiddleware,
    verifyRoleMiddleware([ROLE.ADMIN, ROLE.USER]),
    wrapHandlerWithJSONResponse(CatalogController.update),
);

export default catalogRouter;
