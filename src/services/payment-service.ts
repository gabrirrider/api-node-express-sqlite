import Payment from "../models/payment-model";


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