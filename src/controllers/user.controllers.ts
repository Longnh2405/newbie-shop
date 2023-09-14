import { IUserController } from '../common/interfaces/user.interface';
import UserService from '../services/user.services';

const UserController: IUserController = {
    getDetails: UserService.getDetails,
    update: UserService.update,
    changeActive: UserService.changeActive,
    changePassword: UserService.changePassword,
};

export default UserController;
