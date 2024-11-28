import Profile, { ProfileCreationAttributes } from "../models/profile-model";

export class ProfileRepository {
    public async create(data: ProfileCreationAttributes): Promise<Profile> {
        try {
            const profile = await Profile.create(data);
            return profile;
        } catch (error) {
            throw new Error(`Unable to create profile: ${(error as Error).message}`);
        }
    }

    public async findAll(): Promise<Profile[]> {
        try {
            return await Profile.findAll();
        } catch (error) {
            throw new Error(`Unable to fetch profiles: ${(error as Error).message}`);
        }
    }

    public async findById(id: number): Promise<Profile | null> {
        try {
            return await Profile.findByPk(id);
        } catch (error) {
            throw new Error("Unable to find profile with ID ${id): ${(error as Error).message")
        }
    }
}