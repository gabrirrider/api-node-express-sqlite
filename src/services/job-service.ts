import Job from "../models/job-model";

export class JobService {
    public async createJob(contractId: number, description: string, operationDate: Date, paymentDate: Date, price: number, paid: boolean): Promise<Job> {
        try {
            const job = await Job.create({ contractId, description, operationDate, paymentDate, price, paid });
            return job
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`unable to create job: ${error.message}`);

            } else {
                throw new Error('an unknow erro ocurred.')
            }
        }
    }

    public async getAllJobs(): Promise<Job[]> {
        try {
            return await Job.findAll();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`unable to fetch job: ${error.message}`);

            } else {
                throw new Error('an unknow erro ocurred.')
            }
        }
    }

    public async getJobsByContract(contractId: number): Promise<Job[]> {
        try {
            const jobs = await Job.findAll({
                where: {
                    contractId: contractId
                }
            });

            return jobs;
        } catch (error) {
            throw new Error(`Failed to retrieve jobs for contract: ${error}`);
        }
    }

    public async getUnpaidJobsByContract(contractId: number): Promise<Job[]> {
        try {
            const jobs = await Job.findAll({
                where: {
                    contractId: contractId,
                    paid: false
                }
            });

            return jobs;
        } catch (error) {
            throw new Error(`Failed to retrieve jobs for contract: ${error}`);
        }
    }

    public async getUnpaidJobsTotal(): Promise<number> {
        try {
            const result = await Job.sum('price', { where: { paid: false } });
            return result || 0;
        } catch (error) {
            throw new Error(`Failed to calculate sum: ${error}`);
        }
    }
}