import { failedResponse, RequestData, ResponseData, successResponse } from "../../MiddleWare/RequestHandler"
import {TeamMemberOperations} from "./member_models";
const TeamMemberController = {

    create:async (teamMemberData:RequestData):Promise<ResponseData>=>{

    const {userId,
        teamId} = teamMemberData?.body;
        const exist = await TeamMemberOperations.findManyByOptions({
            userId,teamId
        });

        if(exist.length > 0){
            return failedResponse({message:'Invitee already assigned to this team',data:exist[0]})
        }

        const data = await TeamMemberOperations.create(teamMemberData.body);
        return successResponse({message:'You have successfully accepted invite',data });
    },

    update:async (teamMemberData:RequestData):Promise<ResponseData>=>{
        const data = await TeamMemberOperations.update(teamMemberData.body);
        return successResponse({message:'Updated successfully',data });
    },

    delete:async (teamMemberData:RequestData):Promise<ResponseData>=>{
        const {userId,teamId} = JSON.parse(JSON.stringify(teamMemberData.body))
        const data = await TeamMemberOperations.delete({userId,teamId});
        console.log('Deting...',userId,teamId);
        
        return successResponse({message:'Deleted successfully',data });
    },

    findByUid:async (teamMemberData:RequestData):Promise<ResponseData>=>{
        const data = await TeamMemberOperations.findOneByID(JSON.parse(JSON.stringify(teamMemberData.params))?.id);
        return successResponse({message:'Data retrieved successfully.',data });
    },

    findAllByOptions:async (teamMemberData:RequestData):Promise<ResponseData>=>{
        const val= JSON.parse(JSON.stringify(teamMemberData.queries));
        if(!val) return successResponse({message:'Data retrieved successfully.',data:[] });
        const data = await TeamMemberOperations.findManyByOptions(val);
        return successResponse({message:'Data retrieved successfully.',data });
    },

}

export default TeamMemberController;