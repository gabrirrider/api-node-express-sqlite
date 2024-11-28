import { Request, Response } from "express";
import { ProfileService } from "../services/profile-service";

export class ProfileController {
    private profileService: ProfileService;

    constructor() {
        this.profileService = new ProfileService();
    }

    public async createProfile(req: Request, res: Response): Promise<Response> {
        try {
            const { firstName, lastName, profession, balance, type } = req.body;
            const newProfile = await this.profileService.createProfile(firstName, lastName, profession, balance, type);

            return res.status(201).json(newProfile);
        } catch (error) {
            return res.status(500).json({ message: "Failed to create profile", error });
        }
    }
    public async getAllProfiles(req: Request, res: Response): Promise<Response> {

        try {
            const profiles = await this.profileService.getAllProfiles();
            return res.status(200).json(profiles);
        } catch (error) {
            return res.status(500).json({ message: "Failed to fetch profiles", error });
        }
    }
    public async getProfileBalance(req: Request, res: Response): Promise<Response> {
        const profileId = parseInt(req.params.profileId);

        try {
            const balance = await this.profileService.getProfileBalance(profileId);
            return res.status(200).json({ balance });
        } catch (error) {
            return res.status(500).json({ message: "Failed to fetch profiles balance", error });
        }
    }
    public async updateProfileBalance(req: Request, res: Response): Promise<Response> {
        const profileId = parseInt(req.params.id);
        const amount = req.body.amount;

        try {
            const updatedProfile = await this.profileService.updateBalance(profileId, amount);
            return res.status(200).json(updatedProfile);
        } catch (error) {
            return res.status(500).json({ message: "Failed to update balance", error });
        }
    }

}