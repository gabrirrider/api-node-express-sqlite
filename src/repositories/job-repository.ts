import Job, { JobCreationAttributes } from "../models/job-model";

export class JobRepository {
    public async create(data: JobCreationAttributes): Promise<Job> {
        try {
            const job = await Job.create(data);
            return job;
        } catch (error) {
            throw new Error(`Unable to create job: ${(error as Error).message}`);
        }
    }

    public async findAll(): Promise<Job[]> {
        try {
            return await Job.findAll();
        } catch (error) {
            throw new Error(`Unable to fetch jobs: ${(error as Error).message}`);
        }
    }

    public async findById(id: number): Promise<Job | null> {
        try {
            return await Job.findByPk(id);
        } catch (error) {
            throw new Error("Unable to find job with ID ${id): ${(error as Error).message")
        }
    }
}