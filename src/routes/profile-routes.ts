import { Router } from "express";
import { ProfileController } from "../controllers/profile-controller";

const router = Router();
const profileController = new ProfileController();

//cria um pprofile
router.post("/profiles", (req, res) => profileController.createProfile(req, res));
//retonar todos os profiles
router.get("/profiles", (req, res) => profileController.getAllProfiles(req, res));
//retorna o balance do profile do parâmetro :profileId
router.get("/profiles/balance/:profileId", (req, res) => profileController.getProfileBalance(req, res));

type profileRoutes = typeof router;

export default router as profileRoutes;