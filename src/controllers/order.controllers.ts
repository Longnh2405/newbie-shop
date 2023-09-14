import { RequestHandler } from 'express';
import OrderService from '../services/order.service';

interface IOrderController {
    get: RequestHandler;
    create: RequestHandler;
    update: RequestHandler;
}

const OrderController: IOrderController = {
    get: OrderService.get,
    create: OrderService.create,
    update: OrderService.update,
};

export default OrderController;
