import { Request, Response } from "express";
import { PaymentService } from "../services/payment-service";

export class PaymentController {
    private paymentService: PaymentService;

    constructor() {
        this.paymentService = new PaymentService();
    }

    public async createPayment(req: Request, res: Response): Promise<Response> {
        try {
            const { jobId, operationDate, paymentValue } = req.body;
            const newPayment = await this.paymentService.createPayment(jobId, operationDate, paymentValue);

            return res.status(201).json(newPayment);
        } catch (error) {
            return res.status(500).json({ message: "Failed to create payment", error });
        }
    }
    public async getAllPayments(req: Request, res: Response): Promise<Response> {

        try {
            const payments = await this.paymentService.getAllPayments();
            return res.status(200).json(payments);
        } catch (error) {
            return res.status(500).json({ message: "Failed to fetch payments", error });
        }
    }
}