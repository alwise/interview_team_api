import {Request,Response} from 'express';
import { TeamInt } from '../../Helpers/interfaces';
import { failedResponse } from '../../MiddleWare/RequestHandler';
import { Team } from './team_model';

const TeamMiddleware = {

    validateTeamCreation : async(req:Request,res:Response,next:any)=>{
        try {
            const data:Partial<TeamInt> = req.body;
            if(!data?.name || data?.name?.length == 0) return res.send(
                failedResponse({message:'Team name is required'})
            )
        
            const exist = await Team.findOne({where:{name:data?.name?.toLowerCase()?.trim()}})
            
            if(exist?.id !== undefined) return res.send(
                failedResponse({message:'Team name already taken',error:{message:'team name already exist'}})
            );
            req.body = {name:data?.name?.toLowerCase()?.trim()} 
           return next()   
        } catch (error) {
           return res.send(
                failedResponse({message:'Team name already taken',error})
            );
        }
    },

    validateTeamUpdate : async(req:Request,res:Response,next:any)=>{
        try {
            const data:Partial<TeamInt> = req.body;
            if(!data?.id || data?.id.length == 0) return res.send(
                failedResponse({message:'Unable to complete request',error:{message:'Id is required.'}})
            );

            if(!data?.name || data?.name.length == 0) return res.send(
                failedResponse({message:'Team name is required'})
            )
           
           req.body = {name:data?.name?.toLowerCase()?.trim(),id:data?.id?.trim()} 
           return next()   
        } catch (error) {
           return res.send(
                failedResponse({message:'Unable to complete request',error})
            );
        }
    }
   
}

export default TeamMiddleware;