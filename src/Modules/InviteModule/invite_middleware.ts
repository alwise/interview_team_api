import { Request, Response } from "express";

import { InviteInt, InviteStatus } from "../../Helpers/interfaces";
import { failedResponse, successResponse } from "../../MiddleWare/RequestHandler";
import { TeamMember } from "../TeamMembersModule";
import { User } from "../UsersModule";
import { Invite } from "./invite_model";
const InviteMiddleware = {

    validateInviteData: async (req:Request,res:Response,next:any)=>{
        try {
            const data:Partial<InviteInt> = req.body;
            if(!data?.email || data?.email?.length == 0) return res.send (failedResponse({message:'email is required',error:{message:'invitee email is required.'}}));

            if(!data?.teamId || data?.teamId?.length == 0) return res.send (failedResponse({message:'Unable to complete request',error:{message:'team id is required.'}}));

            const user = await User.findOne({
                where:{email:data.email.toLocaleLowerCase()}
            });

            if(user?.uid) {
                const userAlreadyTeamMember = await TeamMember.findOne({
                    where:{teamId:data?.teamId, userId:user?.uid}
                });
                if(userAlreadyTeamMember?.id)return res.send (failedResponse({message:'User already assigned to team',error:{message:'team id is required.'}}));
            }
            req.body = {
                teamId:data?.teamId,
                email:data?.email,
                status:'Sent',
                metadata:{},
            }
            return next();
        } catch (error) {
            return res.send (failedResponse({message:'Unable to complete request',error:{message:error.message,error}}));
        }

    },

    isValidLinkAnUserExist:async(req:Request,res:Response) =>{
        try {
            const data:Partial<InviteInt> = JSON.parse(JSON.stringify(req.query));

            if(!data?.id || data?.id === undefined || data?.id?.length < 3)return res.send (failedResponse({message:'Invalid invitation link',error:{message:'no id specified for invitation link'}}));

            const inviteExists = await Invite.findByPk(data?.id);
            if(!inviteExists?.id || inviteExists?.id === undefined || inviteExists?.id?.length < 3)return res.send (failedResponse({message:'Invalid invitation link',error:{message:'no id specified for invitation link'}}));
            
            const status:InviteStatus = inviteExists.status;
            if(status !== 'Sent')return res.send (failedResponse({message:'Invalid invitation link',error:{message:'no id specified for invitation link'}}));

            const userExist = await User.findOne({where:{email:inviteExists?.email}});
            return res.send (successResponse({message:'Data retrieved successfully.',data:userExist}));
        } catch (error) {
            return res.send (failedResponse({message:'Unable to complete request',error}));
        }

    },

    isValidLink:async(req:Request,res:Response,next:any) =>{
        try {
            const data:Partial<InviteInt> = JSON.parse(JSON.stringify(req.query));

            if(!data?.id || data?.id === undefined || data?.id?.length < 3)return res.send (failedResponse({message:'Invalid invitation link',error:{message:'no id specified for invitation link'}}));

            const inviteExists = await Invite.findByPk(data?.id);
            if(!inviteExists?.id || inviteExists?.id === undefined || inviteExists?.id?.length < 3)return res.send (failedResponse({message:'Invalid invitation link',error:{message:'no id specified for invitation link'}}));
            
            const status:InviteStatus = inviteExists?.status;
            if(status !== 'Sent')return res.send (failedResponse({message:'Invalid invitation link',error:{message:'no id specified for invitation link'}}));
            req.body = {
                id:inviteExists.id,
                teamId:inviteExists?.teamId ,
                email:inviteExists?.email,
                status,
                metadata:inviteExists?.metadata
            }
            return next();
        } catch (error) {
            return res.send (failedResponse({message:'Unable to complete request',error}));
        }

    },

}


export default InviteMiddleware;




