import { Request, Response } from "express";
import { RemoveOrderService } from "../../services/order/RemoveOrderService";

class RemoveOrderController {
    async handle(req: Request, res: Response) {

        //usa query quando é um queryParam
        const order_id = req.query.order_id as string;

        const removeOrderService = new RemoveOrderService();

        const order = await removeOrderService.execute({order_id});

        return res.json(order);
    }    
}
export {RemoveOrderController}