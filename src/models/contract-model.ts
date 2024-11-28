import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import Profile from './profile-model';

interface ContractAttributes {
    id: number;
    terms: string;
    clienteId: number;
    contractorId: number;
    operationDate: Date;
    status: string;
}

interface ContractCreationAttributes extends Optional<ContractAttributes, 'id'> { }

export class Contract extends Model<ContractAttributes, ContractCreationAttributes>
    implements ContractAttributes {
    public id!: number;
    public terms!: string;
    public clienteId!: number;
    public contractorId!: number;
    public operationDate!: Date;
    public status!: string;

    static initModel(sequelize: Sequelize) {
        Contract.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                terms: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                clienteId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: Profile,
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                contractorId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: Profile,
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                operationDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Contract',
                tableName: 'Contract',
                timestamps: false,
                freezeTableName: true,
            }
        );
    }
    static associate() {
        Contract.belongsTo(Profile, {
            foreignKey: 'clientId',
            as: 'client',
        });

        Contract.belongsTo(Profile, {
            foreignKey: 'contractorId',
            as: 'contractor',
        });
    }
}

export { ContractAttributes as ContractAttributes, ContractCreationAttributes as ContractCreationAttributes };
export default Contract;
