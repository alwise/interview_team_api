import { DataTypes, Model, UUIDV4 } from "sequelize";
import sequelize from "../../Database";
import { UserInt } from "../../Helpers/interfaces";
export class User extends Model {
  uid!: string;
  name!: string;
  profilePhoto!: string;
  email!: string;
  username!: string;
  password!: string;
}

/**
 *  initialize  User schema to create user table in database
 */

User.init(
  {
    uid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    name: { type: DataTypes.STRING(180) },
    profilePhoto: { type: DataTypes.STRING() },
    email: {
      type: DataTypes.STRING(140),
      unique: { name: "email", msg: "Email already exist." },
      validate: { isEmail: { msg: "Invalid email." } },
    },
    username: {
      type: DataTypes.STRING(60),
      unique: { name: "username", msg: "username already exist." },
    },
    password: { type: DataTypes.STRING(120) },
  },
  {
    underscored: true,
    freezeTableName: true,
    sequelize,
  }
);

/**
 *  crude operations
 */

const UserOperations = {
  create: async (userData: Partial<UserInt>) => await User.create(userData),
  update: async (userData: Partial<UserInt>) =>
    await User.update({ userData }, { where: { uid: userData.uid } }),
  delete: async (userData: Partial<UserInt>) =>
    await User.destroy({ where: { uid: userData.uid } }),
  findOneByID: async (uid: string) => await User.findByPk(uid),
  findManyByOptions: async (options: object) =>
    await User.findAll({ where: { ...options } }),
};

export default UserOperations;
