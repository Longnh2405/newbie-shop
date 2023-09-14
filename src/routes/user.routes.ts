import { Router } from 'express';

import { wrapHandlerWithJSONResponse } from '../common/response';
import UserController from '../controllers/user.controllers';

import { verifyRoleMiddleware } from '../middleware';
import { ROLE } from '../util/constant';

const userRouter = Router();

/**
 * @openapi
 * /api/user:
 *  post:
 *     tags:
 *     - User
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

userRouter.get(
    '/detail',
    verifyRoleMiddleware([ROLE.ADMIN, ROLE.USER]),
    wrapHandlerWithJSONResponse(UserController.getDetails),
);

userRouter.put(
    '/update',
    verifyRoleMiddleware([ROLE.ADMIN, ROLE.USER]),
    wrapHandlerWithJSONResponse(UserController.update),
);

userRouter.put(
    '/change-active',
    verifyRoleMiddleware([ROLE.ADMIN, ROLE.USER]),
    wrapHandlerWithJSONResponse(UserController.changeActive),
);

userRouter.put(
    '/change-password',
    verifyRoleMiddleware([ROLE.ADMIN, ROLE.USER]),
    wrapHandlerWithJSONResponse(UserController.changePassword),
);

export default userRouter;
