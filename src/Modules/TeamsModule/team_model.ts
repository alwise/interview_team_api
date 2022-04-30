import { DataTypes, Model,UUIDV4 } from "sequelize";
import sequelize from '../../Database/index';
import { TeamInt } from "../../Helpers/interfaces";

export class Team extends Model{
    id:string;
    name:string;
    // ownerId:string
}
/**
 *  initialize & create team table
 */
Team.init({
    id:{type:DataTypes.UUID,allowNull:false,primaryKey:true,defaultValue:UUIDV4},
    name:{type:DataTypes.STRING(180),allowNull:false,unique:{name:'name',msg:'Team name already exist'}},
    // ownerId:{type:DataTypes.STRING(180),allowNull:false},
},{sequelize,underscored:true,freezeTableName:true})


const TeamOperations = {
    create: async (teamData: Partial<TeamInt>) => await Team.create(teamData),
    update: async (teamData: Partial<TeamInt>) =>
      await Team.update({ teamData }, { where: { id: teamData.id } }),
    delete: async (teamData: Partial<TeamInt>) =>
      await Team.destroy({ where: { id: teamData.id } }),
    findOneByID: async (id: string) => await Team.findByPk(id),
    findManyByOptions: async (options: object) =>
      await Team.findAll({where:{...options}})
}

export default TeamOperations;