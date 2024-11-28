import Contract from "../models/contract-model";

export class ContractService {
    public async createContract(terms: string, clienteId: number, contractorId: number, operationDate: Date, status: string): Promise<Contract> {
        try {
            const contract = await Contract.create({ terms, clienteId, contractorId, operationDate, status });
            return contract
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`unable to create contract: ${error.message}`);

            } else {
                throw new Error('an unknow erro ocurred.')
            }
        }
    }

    public async getContractsByClient(clienteId: number): Promise<Contract[]> {
        try {
            const contracts = await Contract.findAll({
                where: {
                    clienteId: clienteId
                }
            });

            return contracts;
        } catch (error) {
            throw new Error(`Failed to retrieve contracts for client: ${error}`);
        }
    }

    public async getAllContracts(): Promise<Contract[]> {
        try {
            return await Contract.findAll();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`unable to fetch contract: ${error.message}`);

            } else {
                throw new Error('an unknow erro ocurred.')
            }
        }
    }
}