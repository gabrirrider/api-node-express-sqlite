import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import Profile from './profile-model';

interface DepositAttributes {
    id: number;
    clienteId: number;
    operationDate: Date;
    depositValue: number;
}

interface DepositCreationAttributes extends Optional<DepositAttributes, 'id'> { }

export class Deposit extends Model<DepositAttributes, DepositCreationAttributes>
    implements DepositAttributes {
    public id!: number;
    public clienteId!: number;
    public operationDate!: Date;
    public depositValue!: number;

    static initModel(sequelize: Sequelize) {
        Deposit.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
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
                operationDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                depositValue: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Deposit',
                tableName: 'Deposit',
                timestamps: false,
                freezeTableName: true,
            }
        );
    }

    static associate() {
        Deposit.belongsTo(Profile, {
            foreignKey: 'clienteId',
            as: 'profile',
        });
    }
}

export { DepositAttributes as DepositAttributes, DepositCreationAttributes as DepositCreationAttributes };
export default Deposit;
