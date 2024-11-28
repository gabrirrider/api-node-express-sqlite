import Profile from "../models/profile-model";

export class ProfileService {
    public async createProfile(firstName: string, lastName: string, profession: string, balance: number, type: string): Promise<Profile> {
        try {
            const profile = await Profile.create({ firstName, lastName, profession, balance, type });
            return profile
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`unable to create profile: ${error.message}`);

            } else {
                throw new Error('an unknow erro ocurred.')
            }
        }
    }

    public async getAllProfiles(): Promise<Profile[]> {
        try {
            return await Profile.findAll();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`unable to fetch profile: ${error.message}`);

            } else {
                throw new Error('an unknow erro ocurred.')
            }
        }
    }

    public async getProfileBalance(profileId: number): Promise<number> {
        try {

            const profile = await Profile.findByPk(profileId);
            if (!profile) {
                throw new Error('Profile not found');
            }
            return profile.balance;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`failed to retrieve profile balance: ${error.message}`);

            } else {
                throw new Error('an unknow erro ocurred.')
            }
        }
    }

    public async updateBalance(profileId: number, amount: number): Promise<Profile> {
        try {
            if (amount < 0) {
                throw new Error("Deposit amount must be positive.");
            }

            const profile = await Profile.findByPk(profileId);
            if (!profile) {
                throw new Error(`Profile with ID ${profileId} not found.`);
            }

            profile.balance += amount;

            await profile.save();

            return profile;
        } catch (error) {
            throw new Error(`Failed to update balance: ${error}`);
        }
    }
}