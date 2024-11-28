import { Router } from "express";

import { DepositController } from "../controllers/deposit-controller";

const router = Router();
const depositController = new DepositController();

//cria um deposit
router.post("/deposits", (req, res) => depositController.createDeposit(req, res));
//cria um deposit que soma ao balance do profile do parâmetro :id
router.post("/deposits/profile/:id", depositController.createSimpleDeposit.bind(depositController));
//retorna todos os deposits
router.get("/deposits", (req, res) => depositController.getAllDeposits(req, res));

type depositRoutes = typeof router;

export default router as depositRoutes;