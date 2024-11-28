import Contract from "../models/contract-model";
import Job from "../models/job-model";
import Payment from "../models/payment-model";
import Profile from "../models/profile-model";


export class PaymentService {
    public async createPayment(jobId: number, operationDate: Date, paymentValue: number): Promise<Payment> {
        try {
            const payment = await Payment.create({ jobId, operationDate, paymentValue });
            return payment
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`unable to create payment: ${error.message}`);

            } else {
                throw new Error('an unknow erro ocurred.')
            }
        }
    }

    public async createJobPayment(jobId: number, paymentValue: number): Promise<Payment> {
        try {
            const payment = await Payment.create({
                jobId,
                paymentValue,
                operationDate: new Date()
            });

            const job = await Job.findOne({ where: { id: jobId } });
            if (!job) {
                throw new Error(`Profile with ID ${jobId} not found.`);
            }

            const contract = await Contract.findOne({ where: { id: job.contractId } });
            if (!contract) {
                throw new Error(`Profile with ID ${job.contractId} not found.`);
            }

            const client = await Profile.findOne({ where: { id: contract.clienteId } });
            if (!client) {
                throw new Error(`Profile with ID ${contract.clienteId} not found.`);
            }

            const contractor = await Profile.findOne({ where: { id: contract.contractorId } });
            if (!contractor) {
                throw new Error(`Profile with ID ${contract.contractorId} not found.`);
            }

            client.balance -= paymentValue;
            await client.save();

            contractor.balance += paymentValue;
            await contractor.save();

            job.price -= paymentValue;
            await job.save();

            if (paymentValue >= job.price) {
                job.paymentDate = payment.operationDate;
                job.paid = true;
                await job.save();
            }

            return payment;
        } catch (error) {
            throw new Error(`Failed to create payment: ${error}`);
        }
    }

    public async getAllPayments(): Promise<Payment[]> {
        try {
            return await Payment.findAll();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`unable to fetch payment: ${error.message}`);

            } else {
                throw new Error('an unknow erro ocurred.')
            }
        }
    }
}