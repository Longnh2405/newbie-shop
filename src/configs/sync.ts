import User from '../models/user.module';
import Catalog from '../models/catalog.module';
import Product from '../models/product.module';
import Image from '../models/image.module';
import ImageWithProduct from '../models/image_product.module';
import Order from '../models/order.module';
import OrderDetail from '../models/order_detail.module';
import Color from '../models/color.module';
import Size from '../models/size.module';
import ProductDetail from '../models/product_detail.module';
import Transaction from '../models/transaction.module';

async function syncing() {
    try {
        await User.sync({ force: false, alter: true });
        await Image.sync({ force: false, alter: true });
        await Catalog.sync({ force: false, alter: true });
        await Color.sync({ force: false, alter: true });
        await Size.sync({ force: false, alter: true });
        await Product.sync({ force: false, alter: true });
        await ImageWithProduct.sync({ force: false, alter: true });
        await ProductDetail.sync({ force: false, alter: true });
        await Order.sync({ force: false, alter: true });
        await OrderDetail.sync({ force: false, alter: true });
        await Transaction.sync({ force: false, alter: true });
    } catch (error) {
        console.log('Error syncing: ', error);
    } finally {
        console.log('Done syncing');
    }
}

syncing();

// import models from '@/models';

// models.sequelize
//     .sync({ force: false, alter: true })
//     // xóa hết rồi thêm lại
//     // .sync({ force: true })
//     .then((res: any) => {
//         // console.log('success', res);
//     })
//     .catch((err: any) => {
//         // console.log('error', err);
//     });
