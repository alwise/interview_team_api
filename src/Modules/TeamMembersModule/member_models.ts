
import { Model,UUIDV4,DataTypes } from 'sequelize';
import sequelize from '../../Database';
import { TeamMemberInt } from '../../Helpers/interfaces';
import { User } from '../UsersModule';
import { Team } from '../TeamsModule';

export default class TeamMember extends Model{
    id?:string;
    userId?:string;
    teamId?:string
    role?:string;
}

TeamMember.init({
    id  :{type:DataTypes.UUID,allowNull:false,defaultValue:UUIDV4,primaryKey:true},
    userId :{
        type:DataTypes.UUID,
        allowNull:false,
        // references:{
        //     model:User,
        //     key:'uid'
        // }
    },
    teamId  :{ type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:Team,
            key:'id'
        }
    },
    role :{type:DataTypes.STRING(50),allowNull:false,defaultValue:'member'},
},{sequelize,underscored:true,freezeTableName:true});

TeamMember.belongsTo(Team,{foreignKey:'teamId',onDelete:'cascade'});

export const TeamMemberOperations = {
    create: async (teamMemberData: Partial<TeamMemberInt>) =>
             await TeamMember. create(teamMemberData),
    
    update: async (teamMemberData: Partial<TeamMemberInt>) =>
             await TeamMember. update({ teamMemberData },{where:{id:teamMemberData.id}}),
    
    delete: async (teamMemberData: object) =>
             await TeamMember.destroy({ where:{...teamMemberData}}),
    findOneByID: async (id: string) => await TeamMember.findByPk(id,{include:[{all:true}]}),

    findManyByOptions: async (options: object) =>
      await TeamMember.findAll({ where: { ...options },include:[{all:true}]}),


}


// export default TeamMemberOperations;


// TeamMember.belongsTo(User,{foreignKey:'userId'});




