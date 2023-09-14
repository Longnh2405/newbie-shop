import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { compareWithBcrypt, hashWithBcrypt } from '../util/funcHelper';
import envConfig from '../configs/env.config';
import { IS_ACTIVE } from '../util/constant';
import User from '../models/user.module';
import * as LogEvent from '../util/logEvent';

class Auth {
    private generateTokens: (userInfo: Record<string, any>) =>
        | {
              accessToken: string;
              refreshToken: string;
          }
        | any;
    public login: (req: Request, res: Response, next: NextFunction) => any;
    public register: (req: Request, res: Response, next: NextFunction) => any;

    constructor() {
        this.generateTokens = (userInfo: Record<string, any>) => {
            const accessToken = jwt.sign(userInfo, envConfig.accessTokenSecret, {
                expiresIn: '12h',
            });

            const refreshToken = jwt.sign(userInfo, envConfig.refreshTokenSecret, {
                expiresIn: '12h',
            });

            return { accessToken, refreshToken };
        };

        this.login = async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { phone, password } = req.body;
                const user = await User.findOne({ where: { phone } });

                if (user !== null) {
                    const comparePassword = await compareWithBcrypt(password, user.password);

                    if (user.is_active === IS_ACTIVE.UN_ACTIVE) {
                        return {
                            message: `Tài khoản của bạn đã bị khoá. Vui lòng liên hệ Newbie Shop để được hỗ trợ!`,
                            data: null,
                        };
                    }

                    if (comparePassword) {
                        const token = this.generateTokens({
                            id: user.id,
                        });

                        await User.update(
                            {
                                token: token.accessToken,
                                refresh_token: token.refreshToken,
                            },
                            { where: { id: user.id } },
                        );

                        const userUpdated = await User.findByPk(user.id);

                        if (userUpdated === null) {
                            return;
                        } else {
                            const { password, ...rest } = userUpdated.dataValues;

                            LogEvent.logEvent(`${req.url}---${req.method}`);

                            return {
                                data: rest,
                            };
                        }
                    } else {
                        return {
                            message: `Sai mật khẩu. Vui lòng kiểm tra lại!`,
                            data: null,
                        };
                    }
                } else {
                    return {
                        message: `Số điện thoại: ${phone} chưa được đăng ký trên hệ thống này!`,
                        data: null,
                    };
                }
            } catch (error) {
                console.log('Error login: ', error);
                return {
                    message: 'Error login',
                };
            }
        };

        this.register = async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { phone, password } = req.body;

                const user = await User.findOne({ where: { phone } });
                if (user === null) {
                    const code = hashWithBcrypt(10, password);

                    await User.create({ ...req.body, password: code });

                    const userCreated = await User.findOne({
                        where: { phone },
                    });
                    userCreated.password = password;
                    return {
                        data: userCreated,
                    };
                } else {
                    return {
                        message: 'Đã tồn tại người dùng đăng kí bằng số điện thoại ' + user.phone,
                        data: null,
                    };
                }
            } catch (error) {
                console.log('Error register: ', error);
            }
        };
    }
}

export default new Auth();
