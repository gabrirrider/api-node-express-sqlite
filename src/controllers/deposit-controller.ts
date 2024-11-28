import { Request, Response } from "express";
import { DepositService } from "../services/deposit-service";

export class DepositController {
    private depositService: DepositService;

    constructor() {
        this.depositService = new DepositService();
    }

    public async createDeposit(req: Request, res: Response): Promise<Response> {
        const clienteId = parseInt(req.params.id);
        const depositValue = req.body.depositValue;

        if (depositValue < 0) {
            return res.status(400).json({ message: "Deposit amount must be positive" });
        }

        try {
            const deposit = await this.depositService.createDeposit(clienteId, depositValue);
            return res.status(201).json(deposit);
        } catch (error) {
            return res.status(500).json({ message: "Failed to create deposit", error });
        }
    }

    public async getAllDeposits(req: Request, res: Response): Promise<Response> {

        try {
            const deposits = await this.depositService.getAllDeposits();
            return res.status(200).json(deposits);
        } catch (error) {
            return res.status(500).json({ message: "Failed to fetch deposits", error });
        }
    }
}