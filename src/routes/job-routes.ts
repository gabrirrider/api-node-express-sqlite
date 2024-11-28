import { Router } from "express";
import { JobController } from "../controllers/job-controller";

const router = Router();
const jobController = new JobController();

//cria um job
router.post("/jobs", (req, res) => jobController.createJob(req, res));
//retorna todos os jobs
router.get("/jobs", (req, res) => jobController.getAllJobs(req, res));
//retonar todos os jobs não pagos
router.get("/jobs/allunpaid", (req, res) => jobController.getUnpaidJobsTotal(req, res));
//retorna todos os jobs do contract do parâmetro :contractId
router.get('/jobs/contract/:contractId', (req, res) => jobController.getJobsByContract(req, res));
//retorna todos os jobs não pagos do contract do parâmetro :contractId
router.get('/jobs/unpaid/:contractId', (req, res) => jobController.getUnpaidJobsByContract(req, res));


type jobRoutes = typeof router;

export default router as jobRoutes;