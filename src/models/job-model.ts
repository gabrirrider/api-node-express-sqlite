import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import Contract from './contract-model';

interface JobAttributes {
    id: number;
    contractId: number;
    description: string;
    operationDate: Date;
    paymentDate: Date;
    price: number;
    paid: boolean;
}

interface JobCreationAttributes extends Optional<JobAttributes, 'id'> { }

export class Job extends Model<JobAttributes, JobCreationAttributes>
    implements JobAttributes {
    public id!: number;
    public contractId!: number;
    public description!: string;
    public operationDate!: Date;
    public paymentDate!: Date;
    public price!: number;
    public paid!: boolean;

    static initModel(sequelize: Sequelize) {
        Job.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                contractId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: Contract,
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                description: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                operationDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                paymentDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                price: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                },
                paid: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
            },
            {
                sequelize,
                modelName: 'Job',
                tableName: 'Job',
                timestamps: false,
                freezeTableName: true,
            }
        );
    }
    static associate() {
        Job.belongsTo(Contract, {
            foreignKey: 'contractId',
            as: 'contract',
        });
    }
}

export { JobAttributes as JobAttributes, JobCreationAttributes as JobCreationAttributes };
export default Job;
