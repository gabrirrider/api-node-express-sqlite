import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface ProfileAttributes {
    id: number;
    firstName: string;
    lastName: string;
    profession: string;
    balance: number;
    type: string;
}

interface ProfileCreationAttributes extends Optional<ProfileAttributes, 'id'> { }

export class Profile extends Model<ProfileAttributes, ProfileCreationAttributes>
    implements ProfileAttributes {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public profession!: string;
    public balance!: number;
    public type!: string;

    static initModel(sequelize: Sequelize) {
        Profile.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                firstName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                lastName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                profession: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                balance: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                },
                type: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Profile',
                tableName: 'Profile',
                timestamps: false,
                freezeTableName: true,
            }
        );
    }
}

export { ProfileAttributes as ProfileAttributes, ProfileCreationAttributes as ProfileCreationAttributes };
export default Profile;