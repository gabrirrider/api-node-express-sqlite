import { Request, Response } from "express";
import { JobService } from "../services/job-service";

export class JobController {
    private jobService: JobService;

    constructor() {
        this.jobService = new JobService();
    }

    public async createJob(req: Request, res: Response): Promise<Response> {
        try {
            const { contractId, description, operationDate, paymentDate, price, paid } = req.body;
            const newJob = await this.jobService.createJob(contractId, description, operationDate, paymentDate ?? null, price, paid ?? false);

            return res.status(201).json(newJob);
        } catch (error) {
            return res.status(500).json({ message: "Failed to create job", error });
        }
    }

    public async getAllJobs(req: Request, res: Response): Promise<Response> {

        try {
            const jobs = await this.jobService.getAllJobs();
            return res.status(200).json(jobs);
        } catch (error) {
            return res.status(500).json({ message: "Failed to fetch jobs", error });
        }
    }

    public async getJobsByContract(req: Request, res: Response): Promise<Response> {
        try {
            const contractId = parseInt(req.params.contractId, 10);
            if (isNaN(contractId)) {
                return res.status(400).json({ message: 'Invalid contract ID' });
            }

            const jobs = await this.jobService.getJobsByContract(contractId);
            return res.status(200).json(jobs);
        } catch (error) {
            return res.status(500).json({ message: "Failed to fetch jobs by contract", error });
        }
    }

    public async getUnpaidJobsByContract(req: Request, res: Response): Promise<Response> {
        try {
            const contractId = parseInt(req.params.contractId, 10);
            if (isNaN(contractId)) {
                return res.status(400).json({ message: 'Invalid contract ID' });
            }

            const jobs = await this.jobService.getUnpaidJobsByContract(contractId);
            return res.status(200).json(jobs);
        } catch (error) {
            return res.status(500).json({ message: "Failed to fetch jobs by contract", error });
        }
    }

    public async getUnpaidJobsTotal(req: Request, res: Response): Promise<Response> {
        try {
            const total = await this.jobService.getUnpaidJobsTotal();
            return res.status(200).json({ total });
        } catch (error) {
            return res.status(500).json({ message: "Failed to fetch jobs", error });
        }
    }
}