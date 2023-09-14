import { ICatalogController } from '../common/interfaces/catalog.interface';
import CatalogService from '../services/catalog.service';

const CatalogController: ICatalogController = {
    create: CatalogService.create,
    getList: CatalogService.getList,
    update: CatalogService.update,
};

export default CatalogController;
