import { RequestData, ResponseData, successResponse } from "../../MiddleWare/RequestHandler"
import TeamMemberOperations from "./member_models";
const TeamMemberController = {

    create:async (teamMemberData:RequestData):Promise<ResponseData>=>{
        const data = await TeamMemberOperations.create(teamMemberData.body);
        return successResponse({message:'Created successfully',data });
    },

    update:async (teamMemberData:RequestData):Promise<ResponseData>=>{
        const data = await TeamMemberOperations.update(teamMemberData.body);
        return successResponse({message:'Updated successfully',data });
    },

    delete:async (teamMemberData:RequestData):Promise<ResponseData>=>{
        const data = await TeamMemberOperations.delete(JSON.parse(JSON.stringify(teamMemberData.queries)));
        return successResponse({message:'Deleted successfully',data });
    },

    findByUid:async (teamMemberData:RequestData):Promise<ResponseData>=>{
        const data = await TeamMemberOperations.findOneByID(JSON.parse(JSON.stringify(teamMemberData.params))?.id);
        return successResponse({message:'Data retrieved successfully.',data });
    },

    findAllByOptions:async (teamMemberData:RequestData):Promise<ResponseData>=>{
        const data = await TeamMemberOperations.findManyByOptions(JSON.parse(JSON.stringify(teamMemberData.queries)));
        return successResponse({message:'Data retrieved successfully.',data });
    },

}

export default TeamMemberController;