import { Router } from "express";
import { ContractController } from "../controllers/contract-controller";

const router = Router();
const contractController = new ContractController();

router.post("/contracts", async (req, res) => contractController.createContract(req, res));
router.get("/contracts", (req, res) => contractController.getAllContracts(req, res));

type contractRoutes = typeof router;

export default router as contractRoutes;