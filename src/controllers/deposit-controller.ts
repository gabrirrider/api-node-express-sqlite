import { Request, Response } from "express";
import { DepositService } from "../services/deposit-service";

export class DepositController {
    private depositService: DepositService;

    constructor() {
        this.depositService = new DepositService();
    }

    public async createDeposit(req: Request, res: Response): Promise<Response> {
        try {
            const { clienteId, operationDate, depositValue } = req.body;
            const newDeposit = await this.depositService.createDeposit(clienteId, operationDate, depositValue);

            return res.status(201).json(newDeposit);
        } catch (error) {
            return res.status(500).json({ message: "Failed to create deposit", error });
        }
    }

    public async createSimpleDeposit(req: Request, res: Response): Promise<Response> {
        const clienteId = parseInt(req.params.id);
        const depositValue = Object.values(req.body).find(
            (value) => typeof value === "number" && value >= 0
        );

        if (typeof depositValue !== "number") {
            return res.status(400).json({ message: "A valid deposit amount must be provided" });
        }

        try {
            const deposit = await this.depositService.createSimpleDeposit(clienteId, depositValue);
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