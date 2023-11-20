import { Order } from "../Models";
import { IBaseRepository } from "./IBaseRepository";
export interface IOrderRepository extends IBaseRepository<Order> { 
    viewOrders(userId: number): Promise<any>;
    updateStatus(data: any): Promise<any>;
    getOne(userId?: number, orderId?:number): Promise<any>;
} 
