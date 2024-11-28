import { Router } from "express";
import { JobController } from "../controllers/job-controller";

const router = Router();
const jobController = new JobController();

router.post("/jobs", (req, res) => jobController.createJob(req, res));
router.get("/jobs", (req, res) => jobController.getAllJobs(req, res));
router.get("/jobs/allunpaid", (req, res) => jobController.getUnpaidJobsTotal(req, res));
router.get('/jobs/contract/:contractId', (req, res) => jobController.getJobsByContract(req, res));

type jobRoutes = typeof router;

export default router as jobRoutes;