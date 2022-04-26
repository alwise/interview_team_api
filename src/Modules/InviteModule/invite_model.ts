import { Model,DataTypes,UUIDV4 } from "sequelize";
import { InviteInt, InviteStatus } from "../../Helpers/interfaces";
import sequelize from '../../Database/index';


export class Invite extends Model{
    id:string;
    teamId:string;
    email:string;
    status:InviteStatus;
    metadata:JSON
}

Invite.init({
    id: {type:DataTypes.UUID,allowNull:false,primaryKey:true,defaultValue:UUIDV4},
    teamId: {type:DataTypes.STRING(180)},
    email: {type:DataTypes.STRING(150)},
    status: {type:DataTypes.STRING(25),defaultValue:'Send'},
    metadata: {type:DataTypes.JSON},
},{sequelize,underscored:true,freezeTableName:true})

const InviteOperation = {
    create: async (inviteData: Partial<InviteInt>) => await Invite.create(inviteData ),
    update: async (inviteData: Partial<InviteInt>) =>
      await Invite.update({ inviteData }, { where: { id: inviteData.id } }),
    delete: async (inviteData: Partial<InviteInt>) =>
      await Invite.destroy({ where: { id: inviteData.id } }),
    findOneByID: async (id: string) => await Invite.findByPk(id),
    findManyByOptions: async (options: object) =>
      await Invite.findAll({ where: { ...options } }),
}

export default InviteOperation