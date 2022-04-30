import { Request,Response } from "express"
import { TeamMemberInt } from "../../Helpers/interfaces"
import { failedResponse } from "../../MiddleWare/RequestHandler";
import TeamMember from "./member_models";
const TeamMemberMiddleware = {

    validateCreate: async (req:Request,res:Response,next:any)=>{

        try {
            const data:Partial<TeamMemberInt> = req.body;

            if(!data?.role || data?.role?.length == 0) return res.send (failedResponse({message:'Unable to complete request',error:{message:'Role is required.'}}));

            if(!data?.teamId || data?.teamId?.length == 0) return res.send (failedResponse({message:'Unable to complete request',error:{message:'Team id is required.'}}));

            if(!data?.userId || data?.userId?.length == 0) return res.send (failedResponse({message:'Unable to complete request',error:{message:'User id is required.'}}));

            const exist = await TeamMember.findOne({where:{userId:data?.userId,teamId:data?.teamId}})

            if(exist?.id || exist?.id?.length > 0 ) return res.send (failedResponse({message:'User already assigned to team',error:{message:'User already assigned to this service'}}));
            req.body = {
                role:data?.role,
                teamId:data?.teamId,
                userId:data?.userId,
            }
            return next();
        } catch (error) {
            return res.send (failedResponse({message:'Unable to complete request',error}));
        }

    }
}

export default TeamMemberMiddleware;