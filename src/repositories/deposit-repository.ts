import Deposit, { DepositCreationAttributes } from "../models/deposit-model";

export class DepositRepository {
    public async create(data: DepositCreationAttributes): Promise<Deposit> {
        try {
            const deposit = await Deposit.create(data);
            return deposit;
        } catch (error) {
            throw new Error(`Unable to create deposit: ${(error as Error).message}`);
        }
    }

    public async findAll(): Promise<Deposit[]> {
        try {
            return await Deposit.findAll();
        } catch (error) {
            throw new Error(`Unable to fetch deposits: ${(error as Error).message}`);
        }
    }

    public async findById(id: number): Promise<Deposit | null> {
        try {
            return await Deposit.findByPk(id);
        } catch (error) {
            throw new Error("Unable to find deposit with ID ${id): ${(error as Error).message")
        }
    }
}