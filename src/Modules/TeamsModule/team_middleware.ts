import {Request,Response} from 'express';
import { TeamInt } from '../../Helpers/interfaces';
import { failedResponse } from '../../MiddleWare/RequestHandler';

const TeamMiddleware = {

    validateTeamCreation : async(req:Request,res:Response,next:any)=>{
        try {
            const data:Partial<TeamInt> = req.body;
            if(!data?.name || data?.name.length == 0) return res.send(
                failedResponse({message:'Team name is required'})
            )
            if(!data?.ownerId || data?.ownerId.length == 0) return res.send(
                failedResponse({message:'Unable to complete request',error:{message:'ownerId is not provided'}})
            );
        
           req.body = {name:data?.name?.toLowerCase()?.trim(),ownerId:data?.ownerId?.trim()} 
           return next()   
        } catch (error) {
           return res.send(
                failedResponse({message:'Unable to complete request',error})
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