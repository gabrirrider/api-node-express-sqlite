import { Router } from "express";
import { PaymentController } from "../controllers/payment-controller";

const router = Router();
const paymentController = new PaymentController();

//cria um payment
router.post("/payments", (req, res) => paymentController.createPayment(req, res));
//cria um payment que faz o pagamento do job :jobId, reduz o balance do cliente e acrescenta ao do contractor
router.post("/payjob/:jobId", (req, res) => paymentController.createJobPayment(req, res));
//retorna todos os payments
router.get("/payments", (req, res) => paymentController.getAllPayments(req, res));

type paymentRoutes = typeof router;

export default router as paymentRoutes;