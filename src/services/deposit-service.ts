import Deposit from "../models/deposit-model";
import Profile from "../models/profile-model";

export class DepositService {
    public async createDeposit(clienteId: number, depositValue: number): Promise<Deposit> {
        try {
            if (depositValue < 0) {
                throw new Error("Deposit amount must be positive.");
            }

            const deposit = await Deposit.create({
                clienteId,
                depositValue,
                operationDate: new Date()
            });

            const profile = await Profile.findOne({ where: { id: clienteId } });
            if (!profile) {
                throw new Error(`Profile with ID ${clienteId} not found.`);
            }

            profile.balance += depositValue;
            await profile.save();

            return deposit;
        } catch (error) {
            throw new Error(`Failed to create deposit: ${error}`);
        }
    }

    public async getAllDeposits(): Promise<Deposit[]> {
        try {
            return await Deposit.findAll();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`unable to fetch deposit: ${error.message}`);

            } else {
                throw new Error('an unknow erro ocurred.')
            }
        }
    }
}