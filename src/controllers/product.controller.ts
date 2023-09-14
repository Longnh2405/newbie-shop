import { IProductController } from '../common/interfaces/product.interface';
import ProductService from '../services/product.service';

const ProductController: IProductController = {
    getList: ProductService.getList,
    create: ProductService.create,
    detail: ProductService.detail,
    update: ProductService.update,
    delete: ProductService.delete,
};

export default ProductController;
