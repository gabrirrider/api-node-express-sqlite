import { Router } from "express";
import { ContractController } from "../controllers/contract-controller";

const router = Router();
const contractController = new ContractController();

//cria um contract
router.post("/contracts", async (req, res) => contractController.createContract(req, res));
//retorna todos os contracts
router.get("/contracts", (req, res) => contractController.getAllContracts(req, res));
//retorna todos os jobs do contract do profile do parâmetro :profileId
router.get('/contract/profile/:profileId', (req, res) => contractController.getContractsByProfile(req, res));

type contractRoutes = typeof router;

export default router as contractRoutes;