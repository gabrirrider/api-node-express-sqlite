import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import Job from './job-model';

interface PaymentAttributes {
    id: number;
    jobId: number;
    operationDate: Date;
    paymentValue: number;
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'id'> { }

export class Payment extends Model<PaymentAttributes, PaymentCreationAttributes>
    implements PaymentAttributes {
    public id!: number;
    public jobId!: number;
    public operationDate!: Date;
    public paymentValue!: number;

    static initModel(sequelize: Sequelize) {
        Payment.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                jobId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: Job,
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                operationDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                paymentValue: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Payment',
                tableName: 'Payment',
                timestamps: false,
                freezeTableName: true,
            }
        );
    }

    static associate() {
        Payment.belongsTo(Job, {
            foreignKey: 'jobId',
            as: 'job',
        });
    }
}

export { PaymentAttributes as PaymentAttributes, PaymentCreationAttributes as PaymentCreationAttributes };
export default Payment;
