import { IUploadController } from '../common/interfaces/upload.interface';
import UploadService from '../services/upload.service';

const UploadController: IUploadController = {
    get: UploadService.get,
    create: UploadService.create,
};

export default UploadController;
