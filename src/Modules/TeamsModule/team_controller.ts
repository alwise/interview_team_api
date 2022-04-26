import { RequestData, ResponseData, successResponse } from "../../MiddleWare/RequestHandler"
import TeamOperations from "./team_model";
const TeamController = {

    create:async (teamData:RequestData):Promise<ResponseData>=>{
        const data = await TeamOperations.create(teamData.body);
        return successResponse({message:'Created successfully',data });
    },

    update:async (teamData:RequestData):Promise<ResponseData>=>{
        const data = await TeamOperations.update(teamData.body);
        return successResponse({message:'Updated successfully',data });
    },

    delete:async (teamData:RequestData):Promise<ResponseData>=>{
        const data = await TeamOperations.delete(JSON.parse(JSON.stringify(teamData.queries)));
        return successResponse({message:'Deleted successfully',data });
    },

    findByUid:async (teamData:RequestData):Promise<ResponseData>=>{
        const data = await TeamOperations.findOneByID(JSON.parse(JSON.stringify(teamData.params))?.id);
        return successResponse({message:'Data retrieved successfully.',data });
    },

    findAllByOptions:async (teamData:RequestData):Promise<ResponseData>=>{
        const data = await TeamOperations.findManyByOptions(JSON.parse(JSON.stringify(teamData.queries)));
        return successResponse({message:'Data retrieved successfully.',data });
    },

}

export default TeamController;