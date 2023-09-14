import { NextFunction, RequestHandler, Response } from 'express';

import User from '../models/user.module';

import { IUserService } from '../common/interfaces/user.interface';
import { IAuthRequest } from '../common/interfaces/auth.interface';
import { hashWithBcrypt } from '../util/funcHelper';

async function getDetails(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
        const user = await User.findOne({ where: { id: req.userId } });

        return {
            data: user,
        };
    } catch (error) {
        console.log('Error getUserDetails: ', error);
    }
}

async function update(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
        await User.update(
            {
                ...req.body,
            },
            { where: { id: req.userId } },
        );

        const user = await User.findOne({ where: { id: req.userId } });

        return {
            data: user,
        };
    } catch (error) {
        console.log('Error updateUser: ', error);
    }
}

async function changeActive(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
        await User.update(
            {
                ...req.body,
            },
            { where: { id: req.userId } },
        );

        const user = await User.findOne({ where: { id: req.userId } });

        return {
            data: user,
        };
    } catch (error) {
        console.log('Error changActiveUser: ', { error });
    }
}

async function changePassword(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
        const { new_password } = req.body;

        const code = hashWithBcrypt(10, new_password);

        await User.update(
            {
                password: code,
            },
            { where: { id: req.userId } },
        );

        return {};
    } catch (error) {
        console.log('Error changePassword: ', { error });
    }
}

const UserService: IUserService = {
    getDetails,
    update,
    changeActive,
    changePassword,
};

export default UserService;
