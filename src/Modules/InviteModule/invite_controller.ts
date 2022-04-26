import { InviteInt } from "../../Helpers/interfaces";
import { failedResponse, RequestData, ResponseData, successResponse } from "../../MiddleWare/RequestHandler"
import { Team} from "../TeamsModule";
import { User } from "../UsersModule";
import InviteOperation from "./invite_model";
import {emailTemplate,sendEmail} from "../../MessageServices";
import Config from "../../Config";
import { TeamMemberController } from "../TeamMembersModule";
const InviteController = {
    create:async (inviteData:RequestData):Promise<ResponseData>=>{
        const team = await Team.findByPk(inviteData.body?.teamId)
        const data = await InviteOperation.create(inviteData.body);
       const result = await  sendEmail({
             Messages:[
            { From:{
               Email:Config.email.senderMail,
               Name:Config.email.senderName,
             },
             To:[
               {
                 Email:data?.email,
                 Name:`Hi there,`
               }
             ],
             Subject:'Team Invitation',
             TextPart:`Accept invitation to join @${team?.name} ${Config.frontEnd.host}?id=${data?.id}`,
             HTMLPart: emailTemplate.inviteTemplate({groupName:team?.name,link:`${Config.frontEnd.host}?id=${data?.id}`})
            }]
       });
    
        return successResponse({message:'Request completed successfully',data:result });
    },
    acceptInvite:async (inviteData:RequestData):Promise<ResponseData>=>{
        // body is set using middleware isValidLink 
        const data:Partial<InviteInt> =inviteData.body;

        const user = await User.findOne({where:{email:data?.email}});
        if(!user?.uid || user?.uid == undefined ) return failedResponse({message:'Unauthorized user',statusCode:508});
        inviteData.body = {
            userId:user?.uid,
            teamId:data?.teamId,
            role:'Member'
        }
        const result =  await TeamMemberController.create(inviteData);
        if(result.status == true)
            await InviteOperation.update({...data,status:'Accepted'});

        return result;
    },

    delete:async (inviteData:RequestData):Promise<ResponseData>=>{
        const data = await InviteOperation.delete(JSON.parse(JSON.stringify(inviteData.queries)));
        return successResponse({message:'Deleted successfully',data });
    },

    findByUid:async (inviteData:RequestData):Promise<ResponseData>=>{
        const data = await InviteOperation.findOneByID(JSON.parse(JSON.stringify(inviteData.params))?.id);
        return successResponse({message:'Data retrieved successfully.',data });
    },

    findAllByOptions:async (inviteData:RequestData):Promise<ResponseData>=>{
        const data = await InviteOperation.findManyByOptions(JSON.parse(JSON.stringify(inviteData.queries)));
        return successResponse({message:'Data retrieved successfully.',data });
    },

}

export default InviteController;